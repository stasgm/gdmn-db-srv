import * as bodyParser from 'body-parser';
import { Application } from 'express';
import rateLimit from 'express-rate-limit';
import * as fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import * as path from 'path';

import { AppConfig } from './config/config';
import { unCoughtErrorHandler } from './handlers/errorHandler';
import { Routes } from './routes';
import { db } from './db';

// app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

const limiter = new rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

export class Server {
  public routes: any;

  constructor(app: Application) {
    this.config(app);
    this.routes = new Routes(app);
    db.connect();
  }

  public config(app: Application): void {
    // AppConfig();
    if (!fs.existsSync(path.join(__dirname, './logs/'))) {
      fs.mkdirSync(path.join(__dirname, './logs/'));
    }
    const accessLogStream: fs.WriteStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), {
      flags: 'a'
    });
    app.use(morgan('combined', { stream: accessLogStream }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(limiter); //  apply to all requests
    app.use(unCoughtErrorHandler);
  }
}

const cleanUp = async () => {
  await db.disconnect();
  console.log('bye!');
};

process.on('SIGINT', cleanUp);
