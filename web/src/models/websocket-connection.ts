import { io, type Socket } from "socket.io-client";
import { invalidateLogCache } from "./logs";
import { servers } from "./servers";
import { stateChanged } from "./state-change";
import type { JsonObject } from "../utils/json-value";
import { websocketResponseReceived } from "./websocket-requests";

export type WebsocketConnection = {
  serverId: string;
  socket: Socket;
};

const websocketConnections: WebsocketConnection[] = [];

export function connectWebsockets() {
  servers.forEach((server) => connectWebsocket(server.id));
}

export function connectWebsocket(serverId: string): WebsocketConnection {
  const server = servers.find((s) => s.id === serverId);
  if (!server) {
    throw new Error(`Server with ID ${serverId} not found`);
  }

  // Connect to the server (adjust URL/port if needed)
  const socket: Socket = io(`http://${server.hostname}:${server.port}`);
  socket.on("connect", () => {
    console.log("WebSocket connected", socket.id);
  });
  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
  socket.on("invalidate-cache", () => {
    invalidateLogCache();
  });
  socket.on("websocket-http-response", (response) => {
    websocketResponseReceived(response);
  });

  const websocketConnection = { serverId, socket };
  websocketConnections.push(websocketConnection);
  stateChanged();
  return websocketConnection;
}

export function disconnectWebsockets(): void {
  [...websocketConnections].forEach((connection) => {
    connection.socket.disconnect();
  });
  websocketConnections.length = 0;
  stateChanged();
}

export function websocketSend(serverId: string, data: JsonObject): void {
  const connection = websocketConnections.find(
    (conn) => conn.serverId === serverId,
  );
  if (!connection) {
    throw new Error(`WebSocket connection for server ID ${serverId} not found`);
  }
  connection.socket.emit("websocket-http-request", data);
}
