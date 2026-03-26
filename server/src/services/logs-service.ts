import { log, logs } from '../models/logs.js';
import type { JsonObject } from '../utils/json-value.js';

export function getLogs() {
  return logs;
}

export function createLogString(message: string) {
  log(message);
}

export function createLogObject(payload: JsonObject) {
  log(payload);
}
