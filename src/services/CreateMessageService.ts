import { ObjectId } from "mongoose";
import { injectable } from "tsyringe";
import { Message } from "../schemas/Message";

type CreateChatRoomDTO = {
    to  : ObjectId,
    text : String,
    roomId :  string
};

@injectable()
class CreateMessageService {
  async execute({ roomId,text,to }: CreateChatRoomDTO) {
    const message = await Message.create({
        roomId,text,to 
    });

    return message;
  }
}

export { CreateMessageService };
