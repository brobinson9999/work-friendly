export class TextWriter {
  private chunks: string[] = [];
  private length: number = 0;
  private chunkThreshold: number = 1024 * 16;

  constructor(private next: (chunk: string) => void) {}

  public write(chunk: string): void {
    this.chunks.push(chunk);
    this.length += chunk.length;
    if (this.length >= this.chunkThreshold) {
      this.flush();
    }
  }

  private flush(): void {
    if (this.chunks.length > 0) {
      this.next(this.chunks.join(''));
      this.chunks = [];
      this.length = 0;
    }
  }

  public end(): void {
    this.flush();
  }
}
