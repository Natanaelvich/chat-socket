import { injectable } from "tsyringe";
import { ChatRoom } from "../schemas/ChatRoom";

type CreateChatRoomDTO = {
  idUsers: string[];
};

@injectable()
class CreateChatRoomService {
  async execute({ idUsers }: CreateChatRoomDTO) {
    const chatRoom = await ChatRoom.create({
      idUsers,
    });

    return chatRoom;
  }
}

export { CreateChatRoomService };
