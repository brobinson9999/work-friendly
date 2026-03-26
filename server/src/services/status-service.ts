import {
  getAverageEventLoopErrorMs,
  getAverageImmediateElapsedMs,
} from '../models/performance-samples.js';

export function getStatus() {
  const eventLoopErrorMs = getAverageEventLoopErrorMs();
  const immediateElapsedMs = getAverageImmediateElapsedMs();
  return { eventLoopErrorMs, immediateElapsedMs };
}
