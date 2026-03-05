import { servers } from "./servers";
import { stateChanged } from "./state-change";

export type Request = {
  id: string;
  serverId: string;
  init: RequestInit;
  url: string;
  requestTimestamp: Date;
  responseTimestamp?: Date;
  response?: Response;
};

export const requests: Request[] = [];

export async function executeRequest(
  serverId: string,
  url: string,
  requestInit?: RequestInit,
): Promise<Request> {
  const request = createRequest(serverId, url, requestInit);
  await performRequest(request);
  return request;
}

export function createRequest(
  serverId: string,
  url: string,
  requestInit?: RequestInit,
): Request {
  const server = servers.find((s) => s.id === serverId);
  if (!server) {
    throw new Error(`Server with ID ${serverId} not found`);
  }
  const newRequest: Request = {
    id: crypto.randomUUID(),
    serverId,
    url: `http://${server.hostname}:${server.port}${url}`,
    init: requestInit ?? {},
    requestTimestamp: new Date(),
  };

  requests.push(newRequest);
  stateChanged();
  return newRequest;
}

export async function performRequest(request: Request): Promise<void> {
  request.response = await fetch(request.url, request.init);
  completeRequest(request);
}

export function completeRequest(request: Request): void {
  request.responseTimestamp = new Date();
  stateChanged();
}
