import { readFile, writeFile } from 'fs/promises';
import { homedir } from 'os';
import path from 'path';
import type { JsonValue } from '../utils/json-value.js';
import { FileNotFoundError } from '../errors/file-not-found-error.js';

function pathArrayToString(pathArray: string[]) {
  if (pathArray[0] === '~') {
    pathArray = [...pathArray];
    pathArray[0] = homedir();
  }
  return path.join(...pathArray);
}

export async function getFileContentsJson<T>(path: string[]) {
  const string = await getFileContentsString(path);
  return JSON.parse(string) as T;
}

export async function getFileContentsString(path: string[]) {
  const buffer = await getFileContentsBuffer(path);
  return buffer.toString('utf-8');
}

export async function getFileContentsBuffer(path: string[]) {
  try {
    const contents = await readFile(pathArrayToString(path));
    return contents;
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new FileNotFoundError(path);
    } else {
      throw err;
    }
  }
}

export async function setFileContentsJson(path: string[], content: JsonValue) {
  await setFileContentsString(path, JSON.stringify(content));
}

export async function setFileContentsString(path: string[], content: string) {
  await setFileContentsBuffer(path, Buffer.from(content, 'utf-8'));
}

export async function setFileContentsBuffer(path: string[], content: Buffer) {
  await writeFile(pathArrayToString(path), content);
}
