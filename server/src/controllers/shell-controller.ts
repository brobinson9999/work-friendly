import { type Express } from 'express';
import { runShellCommand } from '../services/shell-service.js';

export function registerShellRoutes(app: Express) {
  app.post('/shell', async (req, res) => {
    res.json(await runShellCommand(req.body.command));
  });
}
