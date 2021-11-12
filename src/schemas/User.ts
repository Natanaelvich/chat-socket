import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    email : String,
    socket_id : String,
    name : String,
    avatar : String
})

const User = model("Users", UserSchema)

export {User}