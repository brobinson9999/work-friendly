export type LogParams = {
  message: string;
};

export type Log = LogParams & {
  timestamp: Date;
};

export const logs: Log[] = [];

export function log(params: LogParams | string): void {
  if (typeof params === 'string') {
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
  const { message, timestamp, ...rest } = newLog;
  const now = timestamp.getTime();
  const lastLogTime =
    logs.length > 1 ? logs[logs.length - 2]?.timestamp.getTime() : null;
  const delta = now - (lastLogTime || now);

  const isoTimestamp = timestamp.toISOString();
  const json = JSON.stringify(rest);
  const logLine = `[${isoTimestamp}] [${delta}ms] ${message}${json !== '{}' ? ` ${json}` : ''}`;
  console.log(logLine);
}
