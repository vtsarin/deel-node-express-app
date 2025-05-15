import { v4 as uuidv4 } from 'uuid';

export default function correlationId(req, res, next) {
  // Use incoming correlation ID header if present, else generate new
  const correlationId = req.headers['x-correlation-id'] || uuidv4();

  // Attach to req for downstream handlers
  req.correlationId = correlationId;

  // Set the correlation ID header in the response
  res.setHeader('X-Correlation-ID', correlationId);

  next();
}