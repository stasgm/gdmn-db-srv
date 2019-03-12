import { Field } from 'gdmn-db';

export { userModel } from './user';

export interface ITableModel {
  name: string;
  fields: {
    [name: string]: string;
  };
}
