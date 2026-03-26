import { type Express } from 'express';
import { createLogin } from '../services/logins-service.js';

export function registerLoginRoutes(app: Express) {
  app.post('/logins', async (req, res) => {
    res.json(await createLogin(req.body.password));
  });
}
