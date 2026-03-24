import { manualPromise, type ManualPromise } from "./manual-promise";

export class PromiseThrottle {
  private runningCount = 0;
  private turns: ManualPromise<void>[] = [];
  private maxConcurrency: number = 0;

  constructor(maxConcurrency: number) {
    this.maxConcurrency = maxConcurrency;
  }

  async throttle<T>(throttled: () => Promise<T>): Promise<T> {
    const waitForTurn = this.runningCount >= this.maxConcurrency;
    if (waitForTurn) {
      const newTurn = manualPromise<void>();
      this.turns.push(newTurn);
      await newTurn.promise;
    }

    try {
      this.runningCount++;
      const result = await throttled();
      return result;
    } finally {
      this.runningCount--;
      const nextTurn = this.turns.shift();
      if (nextTurn) {
        nextTurn.resolve();
      }
    }
  }
}
