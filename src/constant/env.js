import dotenv from 'dotenv';
dotenv.config();

const getEnv = (key, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const ENV = getEnv('NODE_ENV', 'development');
const PORT = Number(getEnv('PORT', 3000));
const LOG_LEVEL = getEnv('LOG_LEVEL', 'info');

export {
  ENV,
  PORT,
  LOG_LEVEL
};