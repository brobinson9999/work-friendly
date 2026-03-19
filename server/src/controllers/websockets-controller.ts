import type {
  IncomingMessage,
  Server as HttpServer,
  ServerResponse,
} from 'node:http';
import { Server as SocketIOServer, Socket as SocketIOSocket } from 'socket.io';
import { log } from '../models/logs.js';
import { registerInvalidateCallback } from '../models/websockets.js';
import type { JsonObject } from '../utils/json-value.js';
import {
  getAverageEventLoopErrorMs,
  getAverageImmediateElapsedMs,
} from '../models/performance-samples.js';

const clients = new Map<string, SocketIOSocket>();
let pendingRequests: number = 0;

export function invalidateCache() {
  clients.forEach((socket) => {
    socket.emit('invalidate-cache', {});
  });
}

export function registerWebsocketRoutes(
  httpServer: HttpServer<typeof IncomingMessage, typeof ServerResponse>,
) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    clients.set(socket.id, socket);
    log({ message: `WebSocket client connected: ${socket.id}` });

    socket.on('disconnect', () => {
      clients.delete(socket.id);
      log({ message: `WebSocket client disconnected: ${socket.id}` });
    });

    socket.on('websocket-http-request', async (data: JsonObject) => {
      let responseData: JsonObject = {};
      let status: number = 0;

      pendingRequests++;
      responseData = await getResponseData();
      pendingRequests--;
      status = 200;

      socket.emit('websocket-http-response', {
        requestId: data.id,
        status,
        data: responseData,
      });
    });
  });

  registerInvalidateCallback(invalidateCache);
}

async function getResponseData(): Promise<JsonObject> {
  const clientsCount = clients.size;
  const eventLoopErrorMs = getAverageEventLoopErrorMs();
  const immediateElapsedMs = getAverageImmediateElapsedMs();
  return {
    clientsCount,
    pendingRequests,
    eventLoopErrorMs,
    immediateElapsedMs,
  };
}
