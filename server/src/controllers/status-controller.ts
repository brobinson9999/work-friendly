import { type Express } from 'express';
import {
  getAverageEventLoopErrorMs,
  getAverageImmediateElapsedMs,
} from '../models/performance-samples.js';

export function registerStatusRoutes(app: Express) {
  app.get('/status', async (req, res) => {
    const eventLoopErrorMs = getAverageEventLoopErrorMs();
    const immediateElapsedMs = getAverageImmediateElapsedMs();
    res.status(200).json({ eventLoopErrorMs, immediateElapsedMs });
  });
}
