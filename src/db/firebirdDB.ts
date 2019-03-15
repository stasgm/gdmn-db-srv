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
  }

  public async disconnect() {
    await this.transaction.rollback();
    await this.connection.disconnect();
    await this.connectionPool.destroy();
  }

  public async read(table: ITableModel): Promise<any> {
    const resultSet = await this.connection.executeQuery(
      this.transaction,
      `select ${Object.keys(table.fields).join(', ')} from ${table.name}`
    );

    const result = [];
    while (await resultSet.next()) {
      result.push(resultSet.getString('id'));
      // result.push(Object.keys(table.fields).map(i => ({ i: resultSet.getString(i) })));
    }

    await resultSet.close();
    return result;
  }
}

export const firebirdDB = new FirebirdDB();
