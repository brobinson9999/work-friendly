import { RingBuffer } from '../utils/ring-buffer.js';

const interval = 10;
const MAX_SAMPLES = 100;
const eventLoopDelaySamples = new RingBuffer(MAX_SAMPLES);
const immediateElapsedSamples = new RingBuffer(MAX_SAMPLES);

export function startPerformanceSampling() {
  let lastIntervalTime = performance.now();
  setInterval(() => {
    const now = performance.now();
    const elapsed = now - lastIntervalTime;
    const error = Math.abs(elapsed - interval);

    eventLoopDelaySamples.push(error);

    lastIntervalTime = now;

    setImmediate(() => {
      const now = performance.now();
      const elapsed = now - lastIntervalTime;
      immediateElapsedSamples.push(elapsed);
    });
  }, interval);
}

export function getAverageEventLoopErrorMs() {
  return eventLoopDelaySamples.getAverage();
}

export function getAverageImmediateElapsedMs() {
  return immediateElapsedSamples.getAverage();
}
