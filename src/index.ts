import { Application } from 'express';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import { AppConfig } from './config/config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { unCoughtErrorHandler } from './handlers/errorHandler';
import { Routes } from './routes';

// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

const limiter = new rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

export class Server {
  constructor(app: Application) {
    this.config(app);
    // tslint:disable-next-line:no-unused-expression
    new Routes(app);
  }

  public config(app: Application): void {
    AppConfig();
    const accessLogStream: fs.WriteStream = fs.createWriteStream(
      path.join(__dirname, './logs/access.log'),
      { flags: 'a' }
    );
    app.use(morgan('combined', { stream: accessLogStream }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(limiter); //  apply to all requests
    app.use(unCoughtErrorHandler);
  }
}
