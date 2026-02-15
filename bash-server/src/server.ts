import express from 'express';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import cors from 'cors';
import { log } from './models/logs.js';
import { registerShellRoutes } from './controllers/shell-controller.js';
import { registerLogsRoutes } from './controllers/logs-controller.js';
import { registerHealthRoutes } from './controllers/health-controller.js';
import { registerSessionRoutes } from './controllers/sessions-controller.js';
import { registerLoginRoutes } from './controllers/logins-controller.js';
import { registerWebsocketRoutes } from './controllers/websockets-controller.js';
// import { addItem } from './models/items.js';

async function startup() {
  log('startup()');

  const port = 3000;

  let app: express.Express = express();
  const httpServer = createServer(app);

  // Custom logging middleware
  app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
      if (req.originalUrl === '/logs') {
        // Don't log requests to /logs to avoid infinite loops
        return;
      }
      const duration = Date.now() - start;
      log({
        message: `[${res.statusCode}] ${req.method} ${req.originalUrl} (${duration}ms)`,
      });
    });

    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  registerHealthRoutes(app);
  registerLoginRoutes(app);
  registerLogsRoutes(app);
  registerSessionRoutes(app);
  registerShellRoutes(app);
  registerWebsocketRoutes(httpServer);

  try {
    await listen(httpServer, port);
  } catch (err) {
    console.error('failed to start listening:', err);
    process.exit(1);
  }
}

// Accepts either an Express app or an HTTP server
async function listen(
  httpServer: Server<typeof IncomingMessage, typeof ServerResponse>,
  port: number,
) {
  log(`listen(${port})`);
  return new Promise((resolve, reject) => {
    const serverInstance = httpServer.listen(port, () =>
      resolve(serverInstance),
    );
    serverInstance.on('error', (err: any) => reject(err));
  });
}

await startup();
log('ready');
