import express, { type Express } from 'express';
import { readFile, writeFile } from 'fs/promises';

export function registerFileRoutes(app: Express) {
  app.get('/file/:filePath', async (req, res) => {
    const { filePath } = req.params;

    if (!filePath) {
      res.status(400).send({ error: 'filePath is required' });
      return;
    }

    const content = await readFile(filePath, { encoding: 'utf-8' });
    res.status(200).send(content);
  });

  app.post(
    '/file/:filePath',
    express.raw({ type: '*/*' }),
    async (req, res) => {
      const { filePath } = req.params;

      if (!filePath) {
        res.status(400).send({ error: 'filePath is required' });
        return;
      }

      const content = req.body as Buffer; // actual bytes from request
      await writeFile(filePath, content); // no encoding needed for Buffer
      res.status(200).send();
    },
  );
}
