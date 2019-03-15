import { Types } from 'gdmn-db';
import { db } from '../db';
import { ITableModel } from './';

const userModel: ITableModel = {
  name: 'gd_user',
  fields: {
    id: Types.INTEGER,
    name: Types.VARCHAR
  }
};

export const getData = () => db.read(userModel);
