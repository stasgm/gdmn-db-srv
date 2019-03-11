import { Users } from '../models/User';

class UserRepo {
  public getAllUsers() {
    return Users;
  }

  public getById(userId: number) {
    return Users.filter(i => i.id = userId);
  }
}

export const userRepo = new UserRepo();
