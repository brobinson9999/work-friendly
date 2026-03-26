import express, { type Express } from 'express';
import {
  getFileContentsBuffer,
  setFileContentsBuffer,
} from '../services/files-service.js';
import { FileNotFoundError } from '../errors/file-not-found-error.js';

export function registerFilesRoutes(app: Express) {
  app.get('/files/*path', async (req, res) => {
    const { path } = req.params;

    try {
      const content = await getFileContentsBuffer(path);
      res.status(200).send(content);
    } catch (err: unknown) {
      if (err instanceof FileNotFoundError) {
        res.status(404).send();
      } else {
        throw err;
      }
    }
  });

  app.post('/files/*path', express.raw({ type: '*/*' }), async (req, res) => {
    const { path } = req.params;

    const content = req.body as Buffer;
    await setFileContentsBuffer(path, content);
    res.status(200).send();
  });
}
