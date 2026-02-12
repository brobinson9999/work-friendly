import { type Express, Router, type Request, type Response } from 'express';
import { log, logs } from '../models/logs.js';

export function registerLogsRoutes(app: Express): void {
  const router = Router();

  const HTTP_OK = 200;
  router.get('/logs', (req: Request, res: Response) => {
    res.status(HTTP_OK).send(logs);
    log(`${HTTP_OK} GET /logs`);
  });

  const HTTP_NO_CONTENT = 204;
  const HTTP_BAD_REQUEST = 400;
  router.post('/logs', (req: Request, res: Response) => {
    const { message } = req.body;
    if (message && typeof message === 'string') {
      log(message);
      res.status(HTTP_NO_CONTENT).send();
      log(`${HTTP_NO_CONTENT} POST /logs`);
      return;
    }

    const { payload } = req.body;
    if (payload && typeof payload === 'object' && payload.message) {
      log(payload);
      res.status(HTTP_NO_CONTENT).send();
      log(`${HTTP_NO_CONTENT} POST /logs`);
      return;
    }

    res.status(HTTP_BAD_REQUEST).send();
    log(`${HTTP_BAD_REQUEST} POST /logs - invalid message`);
  });

  app.use(router);
}
