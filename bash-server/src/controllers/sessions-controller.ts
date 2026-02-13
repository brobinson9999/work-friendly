import { type Express } from 'express';
import { createSession } from '../models/sessions.js';

export function registerSessionRoutes(app: Express) {
  app.post('/sessions', async (req, res) => {
    res.json(await createSession({ loginId: req.body.loginId }));
  });
}
