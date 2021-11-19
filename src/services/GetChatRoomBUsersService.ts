import { ObjectId } from "mongoose";
import { injectable } from "tsyringe";
import { ChatRoom } from "../schemas/ChatRoom";

@injectable()
class GetChatRoomBUsersService {
  async execute(idUsers: ObjectId[]) {
    const room = await ChatRoom.findOne({
      idUsers : {
          $all : idUsers
      }
    });

    return room;
  }
}

export { GetChatRoomBUsersService };
