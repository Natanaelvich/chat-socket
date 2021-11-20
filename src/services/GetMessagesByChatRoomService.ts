import { injectable } from "tsyringe";
import { Message } from "../schemas/Message";

@injectable()
class GetMessagesByChatRoomService {
  async execute(roomId: string) {
    const messages = await Message.find({
      idUsers: {
        roomId,
      },
    }).populate("to").exec();

    return messages;
  }
}

export { GetMessagesByChatRoomService };
