import { executeRequest } from "./requests";
import { stateChanged } from "./state-change";

export type ServerStatusParams = {
  serverId: string;
};

export type ServerStatus = ServerStatusParams & {
  timestamp: Date;
  httpStatus: number;
  eventLoopErrorMs: number;
  immediateElapsedMs: number;
  pingMs: number;
  requestsPerSecond: number;
};

export const serverStatuses: ServerStatus[] = [];

export async function createServerStatus(
  params: ServerStatusParams,
): Promise<ServerStatus> {
  const pingStart = performance.now();
  const request = await executeRequest(params.serverId, "/status");
  const performanceSampleData = await request.response!.json();
  const pingEnd = performance.now();
  const pingMs = pingEnd - pingStart;
  const eventLoopErrorMs = performanceSampleData.eventLoopErrorMs;
  const immediateElapsedMs = performanceSampleData.immediateElapsedMs;
  const requestsPerSecond = performanceSampleData.requestsPerSecond;
  const newServerStatus: ServerStatus = {
    ...params,
    timestamp: new Date(),
    pingMs,
    eventLoopErrorMs,
    immediateElapsedMs,
    httpStatus: request.response!.status,
    requestsPerSecond,
  };
  serverStatuses.push(newServerStatus);
  stateChanged();
  return newServerStatus;
}

export function lastServerStatusWasOk(serverId: string): boolean {
  const lastStatus = lastServerStatus(serverId);
  return lastStatus.httpStatus === 200;
}

export function lastServerStatus(serverId: string): ServerStatus {
  const samples = serverStatuses.filter(
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
      requestsPerSecond: 0,
    };
  }
  return samples[samples.length - 1];
}

export function getEventLoopErrorMsMovingAverage(
  serverId: string,
  windowSize: number = 5,
): number {
  const samples = serverStatuses.filter(
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
  const samples = serverStatuses.filter(
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
  const samples = serverStatuses.filter(
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

export function getRequestsPerSecondMovingAverage(
  serverId: string,
  windowSize: number = 5,
): number {
  const samples = serverStatuses.filter(
    (sample) => sample.httpStatus === 200 && sample.serverId === serverId,
  );
  if (samples.length === 0) {
    return 0;
  }
  const recentSamples = samples.slice(-windowSize);
  const totalRequests = recentSamples.reduce(
    (sum, sample) => sum + sample.requestsPerSecond,
    0,
  );
  return totalRequests / recentSamples.length;
}
