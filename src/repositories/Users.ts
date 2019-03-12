import { userModel } from '../models';

class UserRepo {
  public async getAllUsers() {
    return userModel;
  }

  public getById(userId: number) {
    return userModel.filter(i => i.id = userId);
  }
}

export const userRepo = new UserRepo();
