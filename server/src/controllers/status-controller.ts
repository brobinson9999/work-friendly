import { type Express } from 'express';
import { getStatus } from '../services/status-service.js';

export function registerStatusRoutes(app: Express) {
  app.get('/status', async (req, res) => {
    res.status(200).json(getStatus());
  });
}
