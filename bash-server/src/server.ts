import express from 'express';
import cors from 'cors';
import { log } from './models/logs.js';
import { registerShellRoutes } from './controllers/shell-controller.js';
import { registerLogsRoutes } from './controllers/logs-controller.js';
import { registerHealthRoutes } from './controllers/health-controller.js';
import { registerSessionRoutes } from './controllers/sessions-controller.js';
import { registerLoginRoutes } from './controllers/logins-controller.js';
// import { addItem } from './models/items.js';

async function startup() {
  log('startup()');

  const port = 3000;

  let app: express.Express;
  app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  registerHealthRoutes(app);
  registerLoginRoutes(app);
  registerLogsRoutes(app);
  registerSessionRoutes(app);
  registerShellRoutes(app);

  try {
    await listen(app, port);
  } catch (err) {
    console.error('failed to start listening:', err);
    process.exit(1);
  }
}

async function listen(app: express.Express, port: number) {
  log(`listen(${port})`);

  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server); // Resolve when server starts
    });

    server.on('error', (err) => {
      reject(err); // Reject if there's an error
    });
  });
}

await startup();
log('ready');
