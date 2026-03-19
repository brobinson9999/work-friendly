import type { JsonObject, JsonValue } from "../utils/json-value";
import { servers } from "./servers";
import { stateChanged } from "./state-change";
import { websocketSend } from "./websocket-connection";

export type WebSocketRequest = {
  id: string;
  serverId: string;
  init: RequestInit;
  url: string;
  requestTimestamp: Date;
  responseTimestamp?: Date;
  response?: Response;
  deferred: Deferred<Response>;
};

export const requests: WebSocketRequest[] = [];

export async function executeRequest(
  serverId: string,
  url: string,
  requestInit?: RequestInit,
): Promise<WebSocketRequest> {
  const request = createRequest(serverId, url, requestInit);
  await performRequest(request);
  return request;
}

export function createRequest(
  serverId: string,
  url: string,
  requestInit?: RequestInit,
): WebSocketRequest {
  const server = servers.find((s) => s.id === serverId);
  if (!server) {
    throw new Error(`Server with ID ${serverId} not found`);
  }
  const newRequest: WebSocketRequest = {
    id: crypto.randomUUID(),
    serverId,
    url: `http://${server.hostname}:${server.port}${url}`,
    init: requestInit ?? {},
    requestTimestamp: new Date(),
    deferred: createDeferred<Response>(),
  };

  requests.push(newRequest);
  stateChanged();
  return newRequest;
}

export async function performRequest(request: WebSocketRequest): Promise<void> {
  request.response = await websocketFetch(request);
  completeRequest(request);
}

export function completeRequest(request: WebSocketRequest): void {
  request.responseTimestamp = new Date();
  stateChanged();
}

async function websocketFetch(request: WebSocketRequest): Promise<Response> {
  websocketSend(request.serverId, {
    id: request.id,
    url: request.url,
  });

  await request.deferred.promise;

  return request.response!;
}

export function websocketResponseReceived(response: JsonObject) {
  const requestId = response.requestId;
  const request = requests.find((r) => r.id === requestId);
  if (!request) {
    console.warn(`Received response for unknown request ID ${requestId}`);
    return;
  }
  request.responseTimestamp = new Date();
  request.response = {
    status: response.status,
    json: async () => response.data as JsonValue,
  } as Response;
  request.deferred.resolve(request.response);
  stateChanged();
}

type Deferred<T = void> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
};

function createDeferred<T = void>(): Deferred<T> {
  const deferred = {} as Deferred<T>;
  deferred.promise = new Promise<T>((res, rej) => {
    deferred.resolve = res;
    deferred.reject = rej;
  });
  return deferred;
}
