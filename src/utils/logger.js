import { createLogger, format, transports, addColors } from 'winston';
import { LOG_LEVEL } from "../constant/env.js"
import path from 'path';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

addColors(logColors);

const customFormat = format.printf(({ timestamp, level, message, correlationId }) => {
  return `${timestamp} ${level.toUpperCase()} ${correlationId ?? ''}: ${message}`;
});

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  customFormat,
  format.colorize({ all: true })
);

const logTransports = [
  new transports.Console(),
  new transports.File({
    filename: path.join('logs', 'error.log'),
    level: 'error',
  }),
  new transports.File({ filename: path.join('logs', 'all.log') }),
];

const logger = createLogger({
  level: LOG_LEVEL,
  levels: logLevels,
  format: logFormat,
  transports: logTransports,
});

export default logger;