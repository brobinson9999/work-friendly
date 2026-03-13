import type {
  IncomingMessage,
  Server as HttpServer,
  ServerResponse,
} from 'node:http';
import { Server as SocketIOServer, Socket as SocketIOSocket } from 'socket.io';
import { log } from '../models/logs.js';
import { registerInvalidateCallback } from '../models/websockets.js';

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
    log({ message: `WebSocket client connected: ${socket.id}` });

    socket.on('disconnect', () => {
      clients.delete(socket.id);
      log({ message: `WebSocket client disconnected: ${socket.id}` });
    });
  });

  registerInvalidateCallback(invalidateCache);
}
