import { type Express } from 'express';

export function registerHealthRoutes(app: Express) {
  app.get('/health', async (req, res) => {
    res.status(200).send();
  });
}
