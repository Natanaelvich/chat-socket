import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
    to : {
        type : Schema.Types.ObjectId,
        ref : 'Users'
    },
    text : String,
    created_at : {
        type : Date,
        default : Date.now()
    },
    roomId :  {
        type : String,
        ref : 'ChatRoom'
    }
})

const Message = model("Messages", MessageSchema)

export {Message}