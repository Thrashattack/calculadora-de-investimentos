import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';

import cors from 'cors';

import v1Routes from '@shared/infra/http/api/v1';

import Connection from '@shared/infra/postgres/Connection';

const app = express();

app.use(
  '/api/v1',
  express.json({
    limit: '100MB',
  }),
  cors({
    exposedHeaders: ['X-USE-CACHE'],
  }),
  v1Routes,
);

Connection.testConnection(5)
  .then(() => {
    app.set('connectionPool', Connection.createPool());

    app.set('doRollback', Connection.rollback);
  })
  .catch(e => {
    throw new Error(JSON.stringify(e));
  });

export default app;
