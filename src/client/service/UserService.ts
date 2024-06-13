import User from "../types/User";
import axios from "axios";

class UserService {
  async findUser(username: any): Promise<User> {
    return await axios
      .get(process.env.USER_API!)
      .then((res: any) => {
        const user: User = res.data?.find((u: User) => u.username === username);
        console.log(user);
        return new Promise<User>((resolve) => {
          resolve(user);
        });
      })
      .catch((e) => {
        console.error(e);
        return new Promise<User>((resolve) => {});
      });
  }
}

export default UserService;
