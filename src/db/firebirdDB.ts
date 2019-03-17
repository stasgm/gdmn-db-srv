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

    const fields = [];
    while (await resultSet.next()) {
      const obj: any = {}
      Object.keys(table.fields).forEach(i => obj[i] = resultSet.getString(i.toUpperCase()));
      fields.push(obj);
    }

    await resultSet.close();

    const res = {
      table_name: table.name,
      fields
    }
    return res;
  }
}

export const firebirdDB = new FirebirdDB();
