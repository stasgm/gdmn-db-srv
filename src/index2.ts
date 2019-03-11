import express, { Application } from 'express';
import dotenv from 'dotenv';
import { AConnectionPool, IConnectionOptions, ATransaction, Factory } from 'gdmn-db';

dotenv.config();
const port = process.env.SERVER_PORT || 8080;

const app: Application = express();

const connect = async () => {
  const driver = Factory.FBDriver;
  const dbOptions: IConnectionOptions = {
    server: { host: 'localhost', port: 3053 },
    path: 'test',
    username: 'SYSDBA',
    password: 'masterkey'
  };

  await AConnectionPool.executeConnectionPool({
    connectionPool: driver.newCommonConnectionPool(),
    connectionOptions: dbOptions,
    options: { min: 1, max: 1 },
    callback: async connectionPool => {
      const con = await connectionPool.get();
      const transaction: ATransaction = await con.startTransaction();
      const resultSet = await con.executeQuery(transaction, `select * from gd_contact where contacttype = 4 `);

      while (await resultSet.next()) {
        console.log(`${resultSet.getString('ID')} - ${resultSet.getString('NAME')}`);
      }

      await resultSet.close();
      await transaction.rollback();
      await con.disconnect();
    }
  });
};

app.get('/', (req, res) => {
  connect().catch(err => {
    console.log(err);
  });
  res.send('Hello World!');
});

app.get('/api/v1/contact', (req, res) => {
  connect().catch(err => {
    console.log(err);
  });
  res.send('Hello World!');
});

app.listen(port, (err: any) => {
  if (err) return err;
  console.info(`Server running on : http://localhost:${port}`);
  console.info('Press Ctrl+C to quit.');
});
