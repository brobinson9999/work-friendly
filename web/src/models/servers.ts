export type Server = {
  id: string;
  hostname: string;
  port: number;
  ping?: number;
  status: "unknown" | "pending" | "online" | "offline";
  requestTimestamps: number[];
  responseTimestamps: number[];
};

export const servers: Server[] = [];

export function createServer(server: Server): Server {
  servers.push(server);
  return server;
}

export const localhostServer = createServer({
  id: "localhost",
  hostname: "localhost",
  port: 3000,
  status: "unknown",
  requestTimestamps: [],
  responseTimestamps: [],
});
