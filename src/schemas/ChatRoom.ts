import { model, Schema } from "mongoose";
import { v4 } from "uuid";

const ChatRoomSchema = new Schema({
  idUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  idChatRoom: {
    type: String,
    default: v4(),
  },
});

const ChatRoom = model("ChatRooms", ChatRoomSchema);

export { ChatRoom };
