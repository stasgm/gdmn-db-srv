import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import { Server } from './index';

const app: express.Application = express();
const server: Server = new Server(app);
const port: number = Number(process.env.SERVER_PORT) || 3000;

app.listen(port, 'localhost', (err: any) => {
  if (err) return err;
  console.info(`Server running on : http://localhost:${port}`);
});
