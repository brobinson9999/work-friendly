export class TimeoutMovingAverage {
  private total: number = 0;

  constructor(private time: number) {}

  add(value: number) {
    this.total += value;
    setTimeout(() => (this.total -= value), this.time);
  }

  get(): number {
    return this.total / this.time;
  }
}
