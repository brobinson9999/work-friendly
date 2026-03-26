export class FileNotFoundError extends Error {
  constructor(public path: string[]) {
    super(`File not found: ${path.join('/')}`);
    this.name = 'FileNotFoundError';
  }
}
