// RingBuffer.ts
// A simple fixed-size ring buffer for numeric values.

export class RingBuffer {
  private buffer: number[];
  private maxSize: number;
  private index: number = 0;
  private count: number = 0;
  private sum: number = 0;

  constructor(size: number) {
    this.maxSize = size;
    this.buffer = new Array(size);
  }

  push(value: number) {
    if (this.count === this.maxSize) {
      // Remove the value being overwritten from the sum
      this.sum -= this.buffer[this.index]!;
    } else {
      this.count++;
    }
    this.buffer[this.index] = value;
    this.sum += value;
    this.index = (this.index + 1) % this.maxSize;
  }

  getAverage(): number {
    if (this.count === 0) return 0;
    return this.sum / this.count;
  }

  getCount(): number {
    return this.count;
  }

  getValues(): number[] {
    // Returns the buffer in order of insertion
    if (this.count < this.maxSize) {
      return this.buffer.slice(0, this.count);
    }
    return [
      ...this.buffer.slice(this.index),
      ...this.buffer.slice(0, this.index),
    ];
  }
}
