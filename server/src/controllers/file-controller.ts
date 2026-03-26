import express, { type Express } from 'express';
import { readFile, writeFile } from 'fs/promises';
import { homedir } from 'os';
import path from 'path';

export function registerFileRoutes(app: Express) {
  app.get('/file/*filePathParts', async (req, res) => {
    const { filePathParts } = req.params;

    if (filePathParts[0] === '~') {
      filePathParts[0] = homedir();
    }

    const filePath = path.join(...filePathParts);

    if (!filePath) {
      res.status(400).send({ error: 'filePath is required' });
      return;
    }

    try {
      const content = await readFile(filePath, { encoding: 'utf-8' });
      res.status(200).send(content);
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        res.status(404).send({ error: 'File not found' });
      } else {
        throw err;
      }
    }
  });

  app.post(
    '/file/*filePathParts',
    express.raw({ type: '*/*' }),
    async (req, res) => {
      const { filePathParts } = req.params;

      if (filePathParts[0] === '~') {
        filePathParts[0] = homedir();
      }

      const filePath = path.join(...filePathParts);

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
