import { container } from "tsyringe";
import { io } from "../http";
import { CreateChatRoomService } from "../services/CreateChatRoomService";
import { CreateMessageService } from "../services/CreateMessageService";
import { CreateUserService } from "../services/CreateUserService";
import { GetAllUsersService } from "../services/GetAllUsersService";
import { GetChatRoomBUsersService } from "../services/GetChatRoomBUsersService";
import { GetUserBySocketIdService } from "../services/GetUserBySocketIdService";

io.on("connection", (socket) => {
  socket.on("start", async (data) => {
    const { email, avatar, name } = data;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      avatar,
      name,
      socket_id: socket.id,
    });

    socket.broadcast.emit("new_users", user);
  });

  socket.on("get_users", async (callback) => {
    const getAllUsersService = container.resolve(GetAllUsersService);
    const users = await getAllUsersService.execute();

    callback(users);
  });

  socket.on("start_chat", async (data, callback) => {
    const createChatRoomService = container.resolve(CreateChatRoomService);
    const getChatRoomBUsersService = container.resolve(
      GetChatRoomBUsersService
    );
    const getUserBySocketIdService = container.resolve(
      GetUserBySocketIdService
    );

    const user = await getUserBySocketIdService.execute(socket.id);

    let room = await getChatRoomBUsersService.execute([user._id, data.idUser]);

    if (!room) {
      room = await createChatRoomService.execute({
        idUsers: [data.idUser, user._id],
      });
    }

    socket.join(room.idChatRoom)

    callback({ room });
  });

  socket.on("message", async (data) => {
    const getUserBySocketIdService = container.resolve(GetUserBySocketIdService);
    const createMessageService = container.resolve(CreateMessageService);
  
    const user = await getUserBySocketIdService.execute(socket.id);

    const message = await createMessageService.execute({
        to : user._id,
        text : data.message,
        roomId : data.idChatRoom
    })

    io.to(data.idChatRoom).emit("message", {
        message,
        user
    })
  });
});

