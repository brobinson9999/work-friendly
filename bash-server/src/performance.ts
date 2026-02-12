import { performance } from 'perf_hooks';
import { log } from './models/logs.js';

const amortizeRuns = 1;

export function timeLog<TResult>(
  description: string,
  func: () => TResult,
): TResult {
  const startTime = performance.now();
  let result: TResult;
  for (let i = 0; i < amortizeRuns; i++) {
    result = func();
  }
  const endTime = performance.now();
  log(`${description} took ${(endTime - startTime) / amortizeRuns}ms`);
  return result!;
}

export async function timeLogAsync<TResult>(
  description: string,
  func: () => Promise<TResult>,
): Promise<TResult> {
  const startTime = performance.now();
  let result: TResult;
  for (let i = 0; i < amortizeRuns; i++) {
    result = await func();
  }
  const endTime = performance.now();
  console.log(`${description} took ${(endTime - startTime) / amortizeRuns}ms`);
  return result!;
}
