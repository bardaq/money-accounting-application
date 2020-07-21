import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';

import { initDatabase } from './db';
import errorHandlers from './errorHandlers';
import generateAccountsAPI from './accounts/accounts.routes';
import generateTransactionsAPI from './transactions/transactions.routes';
import logger from '@shared/Logger';

export type AuthUserReq = {
  user: { email: string; iat: number; exp?: number };
};
export type Emitter = (event: string, message: any) => void;

dotenv.config();

const app = express();
export const db = initDatabase();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/status', (req, res) => res.json({ status: 'ok' }));
generateAccountsAPI(app);
generateTransactionsAPI(app);

app.use((req, res) => res.json({ status: 404 }));

errorHandlers(app);
app.on('error', e => logger.error(e));
app.set('port', process.env.PORT || 3007);

const server = http.createServer(app);
server.listen(
  app.get('port'),
  () => logger.info(`\nHTTP server started on ${app.get('port')}`)
);