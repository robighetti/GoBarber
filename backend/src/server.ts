import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './configs/upload';
import AppError from './errors/AppError';

import './database';

/*
  SOLID
  Single Responsability Principle
  Open/closed principle
  Liskov substitution principle
  Interface segragation principle
  Dependency inversion principle
*/

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

/* tratativa de errors */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333 🙂 ');
});
