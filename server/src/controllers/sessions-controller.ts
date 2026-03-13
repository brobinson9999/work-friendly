import { type Express } from 'express';
import { createSession } from '../models/sessions.js';
import { InvalidLoginError } from '../errors/invalid-login-error.js';
import { log } from '../models/logs.js';

export function registerSessionRoutes(app: Express) {
  app.post('/sessions', async (req, res) => {
    try {
      const session = await createSession({ loginId: req.body.loginId });
      res.status(201).json(session);
    } catch (err: any) {
      if (err instanceof InvalidLoginError) {
        return res.status(401).send();
      }

      log({ message: 'unexpected error in POST /sessions:', error: err });
      res.status(500).json();
    }
  });
}
