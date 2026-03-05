import { executeRequest } from "./requests";
import { stateChanged } from "./state-change";

export type PingParams = {
  serverId: string;
};

export type Ping = PingParams & {
  timestamp: Date;
  online: boolean;
  latencyMs: number;
};

export const pings: Ping[] = [];

export async function createPing(params: PingParams): Promise<Ping> {
  try {
    const newRequest = await executeRequest(params.serverId, `/health`);
    const roundTripTime = Math.round(
      (newRequest.responseTimestamp?.getTime() ?? 0) -
        newRequest.requestTimestamp.getTime(),
    );

    const newPing: Ping = {
      ...params,
      timestamp: newRequest.requestTimestamp,
      latencyMs: roundTripTime,
      online: newRequest.response!.ok,
    };
    pings.push(newPing);
    stateChanged();
    return newPing;
  } catch {
    const newPing: Ping = {
      ...params,
      timestamp: new Date(),
      latencyMs: 0,
      online: false,
    };
    pings.push(newPing);
    stateChanged();
    return newPing;
  }
}

export function getMovingAveragePingLatencyMs(
  serverId: string,
  windowSize: number = 5,
): number {
  const samples = pings.filter((ping) => ping.serverId === serverId);
  if (samples.length === 0) {
    return 0;
  }
  const recentSamples = samples.slice(-windowSize);
  const totalLatency = recentSamples.reduce(
    (sum, sample) => sum + sample.latencyMs,
    0,
  );
  return totalLatency / recentSamples.length;
}

export function lastPingWasSuccessful(serverId: string): boolean {
  for (let i = pings.length - 1; i >= 0; i--) {
    if (pings[i].serverId === serverId) {
      return pings[i].online;
    }
  }
  return false;
}
