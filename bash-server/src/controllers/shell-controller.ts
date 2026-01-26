import { type Express } from 'express';
import { runShellCommand } from '../models/shell.js';

export function registerShellRoutes(app: Express) {
  app.post('/shell', async (req, res) => {
    res.json(await runShellCommand(req.body.command));
  });
}
