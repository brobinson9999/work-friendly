import type { JsonObject } from '../utils/json-value.js';

export type LogParams = JsonObject;

export type Log = {
  timestamp: Date;
  payload: JsonObject;
};

export const logs: Log[] = [];

export function log(params: LogParams | string): void {
  if (typeof params === 'string') {
    log({ message: params });
    return;
  }

  const newLog: Log = {
    timestamp: new Date(),
    payload: params,
  };

  logs.push(newLog);

  consoleLog(newLog);
}

function consoleLog(newLog: Log): void {
  const { timestamp, payload } = newLog;
  const { message, ...rest } = payload;
  const now = timestamp.getTime();
  const lastLogTime =
    logs.length > 1 ? logs[logs.length - 2]?.timestamp.getTime() : null;
  const delta = now - (lastLogTime || now);

  const isoTimestamp = timestamp.toISOString();
  const json = JSON.stringify(rest);
  const logLine = `[${isoTimestamp}] [${delta}ms] ${message}${json !== '{}' ? ` ${json}` : ''}`;
  console.log(logLine);
}
