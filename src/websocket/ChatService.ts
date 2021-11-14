import { container } from "tsyringe";
import { io } from "../http";
import { CreateUserService } from "../services/CreateUserService";


io.on("connection", (socket) => {

    socket.on("start", async data => {
        const {email, avatar, name}  = data
        const createUserService = container.resolve(CreateUserService)

        await createUserService.execute({
            email, avatar, name,socket_id : socket.id
        })
    })
});