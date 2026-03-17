import { stateChanged } from "./state-change";

export type PerformanceSampleParams = {
  serverId: string;
};

export type PerformanceSample = PerformanceSampleParams & {
  timestamp: Date;
  eventLoopErrorMs: number;
  immediateElapsedMs: number;
  pingMs: number;
};

export const performanceSamples: PerformanceSample[] = [];

export async function createPerformanceSample(
  params: PerformanceSampleParams,
): Promise<PerformanceSample> {
  const pingStart = performance.now();
  const performanceSample = await fetch("http://localhost:3000/status");
  const pingEnd = performance.now();
  const pingMs = pingEnd - pingStart;
  const performanceSampleData = await performanceSample.json();
  const eventLoopErrorMs = performanceSampleData.eventLoopErrorMs;
  const immediateElapsedMs = performanceSampleData.immediateElapsedMs;

  const newPerformanceSample: PerformanceSample = {
    ...params,
    timestamp: new Date(),
    pingMs,
    eventLoopErrorMs,
    immediateElapsedMs,
  };
  performanceSamples.push(newPerformanceSample);
  stateChanged();
  return newPerformanceSample;
}

export function getEventLoopErrorMsMovingAverage(
  serverId: string,
  windowSize: number = 5,
): number {
  const samples = performanceSamples.filter(
    (sample) => sample.serverId === serverId,
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
  const samples = performanceSamples.filter(
    (sample) => sample.serverId === serverId,
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
  const samples = performanceSamples.filter(
    (sample) => sample.serverId === serverId,
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
