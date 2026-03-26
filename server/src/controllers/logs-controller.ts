import { type Express, type Request, type Response } from 'express';
import {
  createLogObject,
  createLogString,
  getLogs,
} from '../services/logs-service.js';

export function registerLogsRoutes(app: Express): void {
  const HTTP_OK = 200;
  app.get('/logs', (req: Request, res: Response) => {
    res.status(HTTP_OK).send(getLogs());
  });

  const HTTP_NO_CONTENT = 204;
  const HTTP_BAD_REQUEST = 400;
  app.post('/logs', (req: Request, res: Response) => {
    const { message } = req.body;
    if (message && typeof message === 'string') {
      createLogString(message);
      res.status(HTTP_NO_CONTENT).send();
      return;
    }

    const { payload } = req.body;
    if (payload && typeof payload === 'object' && payload.message) {
      createLogObject(payload);
      res.status(HTTP_NO_CONTENT).send();
      return;
    }

    res.status(HTTP_BAD_REQUEST).send();
  });
}
