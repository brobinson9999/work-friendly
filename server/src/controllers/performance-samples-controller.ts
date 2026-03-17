import { type Express } from 'express';
import {
  getAverageEventLoopErrorMs,
  getAverageImmediateElapsedMs,
} from '../models/performance-samples.js';

export function registerPerformanceSamplesRoutes(app: Express) {
  app.get('/performance-samples/moving-average', async (req, res) => {
    const eventLoopErrorMs = getAverageEventLoopErrorMs();
    const immediateElapsedMs = getAverageImmediateElapsedMs();
    res.status(200).json({ eventLoopErrorMs, immediateElapsedMs });
  });
}
