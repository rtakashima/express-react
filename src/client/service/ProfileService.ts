import Profile from "../types/Profile";
import axios from "axios";

class ProfileService {
  async findUser(userUid: any): Promise<Profile> {
    return await axios
      .get(process.env.PROFILE_API!)
      .then((res: any) => {
        const profile: Profile = res.data?.find(
          (p: Profile) => p.userUid === userUid
        );
        console.log(profile);
        return new Promise<Profile>((resolve) => {
          resolve(profile);
        });
      })
      .catch((e) => {
        console.error(e);
        return new Promise<Profile>((resolve) => {});
      });
  }
}

export default ProfileService;
