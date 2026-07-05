import { env } from '../config/env.js';

export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  if (env.nodeEnv !== 'test') {
    console.error(error);
  }

  res.status(statusCode).json({
    message: error.message || 'Internal server error',
    stack: env.nodeEnv === 'production' ? undefined : error.stack
  });
}

