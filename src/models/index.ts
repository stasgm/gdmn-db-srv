export { getData } from './user';
import { Types } from 'gdmn-db';

export interface ITableModel {
  name: string;
  fields: {
    [name: string]: Types;
  };
}

