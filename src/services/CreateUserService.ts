import { injectable } from "tsyringe";
import { User } from "../schemas/User";

type CreateUserDTO = {
  email: String;
  socket_id: String;
  name: String;
  avatar: String;
};

@injectable()
class CreateUserService {
  async execute({ name, email, socket_id, avatar }: CreateUserDTO) {
    const userAlreadyExist = await User.findOne({
      email,
    }).exec();

    if (userAlreadyExist) {
      const user = await User.findOneAndUpdate(
        {
          _id: userAlreadyExist._id,
        },
        {
          $set: { socket_id, avatar, name },
        }
      );

      return user;
    } else {
      const user = await User.create({
        name,
        email,
        socket_id,
        avatar,
      });

      return user;
    }
  }
}

export {CreateUserService}
