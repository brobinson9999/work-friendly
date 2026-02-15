import { redrawAll } from "../hooks/use-redraw-all";
import type { JsonObject } from "../utils/json-value";

export type LogPayload = JsonObject;

export type Log = {
  timestamp: Date;
  payload: LogPayload;
};

export const logs: Log[] = [];

export function invalidateLogCache(): void {
  fetch("http://localhost:3000/logs")
    .then((res) => res.json())
    .then((data) => {
      logs.length = 0;
      data.forEach((log: Log) =>
        logs.push({ ...log, timestamp: new Date(log.timestamp) }),
      );
      redrawAll();
    });
}

export function log(payload: LogPayload | string): void {
  if (typeof payload === "string") {
    log({ message: payload });
    return;
  }

  const newLog = {
    payload: payload,
    timestamp: new Date(),
  };

  logs.push(newLog);

  consoleLog(newLog);
}

function consoleLog(newLog: Log): void {
  const logLine = formatLog(newLog);
  console.log(logLine);
}

export function formatLog(newLog: Log): string {
  const { payload, timestamp, ...rest } = newLog;
  const { message } = payload;
  const now = timestamp.getTime();
  const lastLogTime = logs[logs.length - 2]?.timestamp.getTime();
  const delta = now - (lastLogTime || now);

  const isoTimestamp = timestamp.toISOString();
  const json = JSON.stringify(rest);
  const logLine = `[${isoTimestamp}] [${delta}ms] ${message}${json !== "{}" ? ` ${json}` : ""}`;
  return logLine;
}
