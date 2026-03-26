import { type Express } from 'express';
import { InvalidLoginError } from '../errors/invalid-login-error.js';
import { log } from '../models/logs.js';
import { createSession } from '../services/sessions-service.js';

export function registerSessionRoutes(app: Express) {
  app.post('/sessions', async (req, res) => {
    try {
      const session = await createSession(req.body.loginId);
      res.status(201).json(session);
    } catch (err: unknown) {
      if (err instanceof InvalidLoginError) {
        return res.status(401).send();
      }

      log({
        message: 'unexpected error in POST /sessions:',
        error: (err as Error).message,
      });
      res.status(500).json();
    }
  });
}
