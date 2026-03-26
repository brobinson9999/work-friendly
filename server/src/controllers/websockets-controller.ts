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
  clientConnected,
  clientDisconnected,
  handleWebsocketHttpRequest,
} from '../services/websockets-service.js';

const clients = new Map<string, SocketIOSocket>();

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
    clientConnected();
    log({ message: `WebSocket client connected: ${socket.id}` });

    socket.on('disconnect', () => {
      clients.delete(socket.id);
      clientDisconnected();
      log({ message: `WebSocket client disconnected: ${socket.id}` });
    });

    socket.on('websocket-http-request', async (data: JsonObject) => {
      const response = await handleWebsocketHttpRequest();

      socket.emit('websocket-http-response', {
        requestId: data.id,
        status: response.status,
        data: response.data,
      });
    });
  });

  registerInvalidateCallback(invalidateCache);
}
