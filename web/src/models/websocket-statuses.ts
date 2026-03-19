import { executeRequest } from "./websocket-requests";
import { stateChanged } from "./state-change";

export type WebsocketStatusParams = {
  serverId: string;
};

export type WebsocketStatus = WebsocketStatusParams & {
  timestamp: Date;
  httpStatus: number;
  eventLoopErrorMs: number;
  immediateElapsedMs: number;
  pingMs: number;
  clientsCount: number;
  pendingRequests: number;
};

export const websocketStatuses: WebsocketStatus[] = [];

export async function createWebsocketStatus(
  params: WebsocketStatusParams,
): Promise<WebsocketStatus> {
  const pingStart = performance.now();
  const request = await executeRequest(params.serverId, "/status");
  const performanceSampleData = await request.response!.json();
  const pingEnd = performance.now();
  const pingMs = pingEnd - pingStart;
  const eventLoopErrorMs = performanceSampleData.eventLoopErrorMs;
  const immediateElapsedMs = performanceSampleData.immediateElapsedMs;
  const clientsCount = performanceSampleData.clientsCount;
  const pendingRequests = performanceSampleData.pendingRequests;

  const newWebsocketStatus: WebsocketStatus = {
    ...params,
    timestamp: new Date(),
    pingMs,
    eventLoopErrorMs,
    immediateElapsedMs,
    clientsCount,
    pendingRequests,
    httpStatus: request.response!.status,
  };
  websocketStatuses.push(newWebsocketStatus);
  stateChanged();
  return newWebsocketStatus;
}

export function lastWebsocketStatusWasOk(serverId: string): boolean {
  const lastStatus = lastWebsocketStatus(serverId);
  return lastStatus.httpStatus === 200;
}

export function lastWebsocketStatus(serverId: string): WebsocketStatus {
  const samples = websocketStatuses.filter(
    (sample) => sample.serverId === serverId,
  );
  if (samples.length === 0) {
    return {
      serverId,
      timestamp: new Date(),
      eventLoopErrorMs: 0,
      immediateElapsedMs: 0,
      pingMs: 0,
      httpStatus: 0,
      clientsCount: 0,
      pendingRequests: 0,
    };
  }
  return samples[samples.length - 1];
}

export function getEventLoopErrorMsMovingAverage(
  serverId: string,
  windowSize: number = 5,
): number {
  const samples = websocketStatuses.filter(
    (sample) => sample.httpStatus === 200 && sample.serverId === serverId,
  );
  if (samples.length === 0) {
    return 0;
  }
  const recentSamples = samples.slice(-windowSize);
  const totalError = recentSamples.reduce(
    (sum, sample) => sum + sample.eventLoopErrorMs,
    0,
  );
  return totalError / recentSamples.length;
}

export function getImmediateElapsedMsMovingAverage(
  serverId: string,
  windowSize: number = 5,
): number {
  const samples = websocketStatuses.filter(
    (sample) => sample.httpStatus === 200 && sample.serverId === serverId,
  );
  if (samples.length === 0) {
    return 0;
  }
  const recentSamples = samples.slice(-windowSize);
  const totalElapsed = recentSamples.reduce(
    (sum, sample) => sum + sample.immediateElapsedMs,
    0,
  );
  return totalElapsed / recentSamples.length;
}

export function getPingMsMovingAverage(
  serverId: string,
  windowSize: number = 5,
): number {
  const samples = websocketStatuses.filter(
    (sample) => sample.httpStatus === 200 && sample.serverId === serverId,
  );
  if (samples.length === 0) {
    return 0;
  }
  const recentSamples = samples.slice(-windowSize);
  const totalPing = recentSamples.reduce(
    (sum, sample) => sum + sample.pingMs,
    0,
  );
  return totalPing / recentSamples.length;
}
