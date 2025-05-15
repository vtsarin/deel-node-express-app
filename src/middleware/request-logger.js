import logger from '../utils/logger.js';
import { performance } from 'perf_hooks';

export default function requestLogger(req, res, next) {
  const requestStartTime = performance.now();
  const { method, originalUrl, ip, correlationId } = req;


  logger.info(`[${correlationId}]: Request received: ${method} ${originalUrl} from ${ip}`);

  res.on('finish', () => {
    const requestErrorTime = performance.now();
    const latencyMs = requestErrorTime - requestStartTime;
    logger.info(
      `[${correlationId}]: Request completed: ${method} ${originalUrl} - Status: ${res.statusCode} - Latency: ${latencyMs.toFixed(2)}ms`
    );
  });

  res.on('error', (err) => {
    const requestErrorTime = performance.now();
    const latencyMs = requestErrorTime - requestStartTime;
    logger.error(
      `[${correlationId}]: Request errored: ${method} ${originalUrl} - Latency: ${latencyMs.toFixed(2)}ms - Error: ${err.message}`
    );
  });

  next();
}
