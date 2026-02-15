import { type Express, Router, type Request, type Response } from 'express';
import { log, logs } from '../models/logs.js';

export function registerLogsRoutes(app: Express): void {
  const router = Router();

  const HTTP_OK = 200;
  router.get('/logs', (req: Request, res: Response) => {
    res.status(HTTP_OK).send(logs);
  });

  const HTTP_NO_CONTENT = 204;
  const HTTP_BAD_REQUEST = 400;
  router.post('/logs', (req: Request, res: Response) => {
    const { message } = req.body;
    if (message && typeof message === 'string') {
      log(message);
      res.status(HTTP_NO_CONTENT).send();
      return;
    }

    const { payload } = req.body;
    if (payload && typeof payload === 'object' && payload.message) {
      log(payload);
      res.status(HTTP_NO_CONTENT).send();
      return;
    }

    res.status(HTTP_BAD_REQUEST).send();
  });

  app.use(router);
}
