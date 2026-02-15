import { redrawAll } from "../hooks/use-redraw-all";

export type LogParams = {
  message: string;
};

export type Log = LogParams & {
  timestamp: Date;
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

export function log(params: LogParams | string): void {
  if (typeof params === "string") {
    log({ message: params });
    return;
  }

  const newLog = {
    ...params,
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
  const { message, timestamp, ...rest } = newLog;
  const now = timestamp.getTime();
  const lastLogTime = logs[logs.length - 2]?.timestamp.getTime();
  const delta = now - (lastLogTime || now);

  const isoTimestamp = timestamp.toISOString();
  const json = JSON.stringify(rest);
  const logLine = `[${isoTimestamp}] [${delta}ms] ${message}${json !== "{}" ? ` ${json}` : ""}`;
  return logLine;
}
