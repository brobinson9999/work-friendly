import express from 'express';
import cors from 'cors';
import { timeLog, timeLogAsync } from './performance.js';
import { registerShellRoutes } from './controllers/shell-controller.js';
// import { addItem } from './models/items.js';

async function startup() {
  timeLogAsync('startup()', async () => {
    const port = 3000;

    let app: express.Express;
    timeLog('Initializing Express app', () => {
      app = express();

      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(cors());

      registerShellRoutes(app);
    });

    await timeLogAsync('Starting server', async () => {
      await startServer(app, port);
    });
  });
}

async function startServer(app: express.Express, port: number) {
  try {
    await new Promise((resolve, reject) => {
      const server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        resolve(server); // Resolve when server starts
      });

      server.on('error', (err) => {
        reject(err); // Reject if there's an error
      });
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

await startup();
