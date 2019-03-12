import {
  AConnectionPool,
  IConnectionOptions,
  ATransaction,
  Factory,
  ICommonConnectionPoolOptions,
  AConnection
} from 'gdmn-db';

import { ITableModel } from '../models/';

const initParams: IConnectionOptions = {
  server: { host: 'localhost', port: 3053 },
  path: 'test',
  username: 'SYSDBA',
  password: 'masterkey'
};

class FirebirdDB {
  private dbOptions: IConnectionOptions;
  private connectionPool: AConnectionPool<ICommonConnectionPoolOptions>;
  private connection: AConnection;
  private transaction: ATransaction;

  constructor(options: IConnectionOptions = initParams) {
    this.dbOptions = options;
  }

  public async connect() {
    const driver = Factory.FBDriver;
    this.connectionPool = driver.newCommonConnectionPool();
    await this.connectionPool.create(this.dbOptions, { min: 1, max: 1 });
    this.connection = await this.connectionPool.get();
    this.transaction = await this.connection.startTransaction();

    /*  this.connectionPool = await AConnectionPool
    await AConnectionPool.executeConnectionPool({
      connectionPool: driver.newCommonConnectionPool(),
      connectionOptions: this.dbOptions,
      options: { min: 1, max: 1 },
      callback: async connectionPool => {
        const con = await connectionPool.get();
        const transaction: ATransaction = await con.startTransaction();
        const resultSet = await con.executeQuery(transaction, `select * from gd_user`);

        while (await resultSet.next()) {
          console.log(`${resultSet.getString('ID')} - ${resultSet.getString('NAME')}`);
        }

        await resultSet.close();
        await transaction.rollback();
        await con.disconnect();
      }
    }) */
  }

  public async disconnect() {
    await this.transaction.rollback();
    await this.connection.disconnect();
    await this.connectionPool.destroy();
  }

  public async read(table: ITableModel): Promise<any> {
    const resultSet = await this.connection.executeQuery(this.transaction, `select * from gd_user`);

    const result = [];
    while (await resultSet.next()) {
      result.push(resultSet.getString('ID'));
    }

    await resultSet.close();
    return result;
  }
}

export const firebirdDB = new FirebirdDB();
