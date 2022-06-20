import express from 'express';
import apiController from '../services';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/ping', (_req, res) => {
    res.send('PONG');
  });

  const controller = apiController();
  app.use("/api", controller);

  return app;
};

export { createServer };
