import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import * as nconf from 'nconf';

import { Server } from './index';

const app: express.Application = express();
const server: Server = new Server(app);
const port: number = nconf.get('http:port');

app.listen(port, 'localhost', (err: any) => {
  if (err) return err;
  console.info(`Server running on : http://localhost:${port}`);
});
