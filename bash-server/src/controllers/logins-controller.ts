import { type Express } from 'express';
import { createLogin } from '../models/logins.js';

export function registerLoginRoutes(app: Express) {
  app.post('/logins', async (req, res) => {
    res.json(await createLogin({ password: req.body.password }));
  });
}
