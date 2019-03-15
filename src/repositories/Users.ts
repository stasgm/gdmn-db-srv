import { getData} from '../models';

class UserRepo {
  public async getAllUsers() {
    return getData();
  }

  public async getById(userId: number) {
    // return userModel().filter();
  }
}

export const userRepo = new UserRepo();
