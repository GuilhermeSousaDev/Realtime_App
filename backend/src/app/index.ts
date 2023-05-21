import "reflect-metadata";
import "./typeorm";
import { io } from "./server";
import CreateMessageService from "../services/CreateMessageService";
import ListMessagesService from "../services/ListMessagesService";
import DeleteMessageService from "../services/DeleteMessageService";
import { Socket } from "socket.io";

async function emitMessages(socket: Socket) {
    const listMessages = new ListMessagesService();
    const messages = await listMessages.execute();

    socket.emit('message', messages);
}

io.on('connection', async (socket) => {
    console.log('User Connected');

    await emitMessages(socket);    

    socket.on('chat', async (message: string) => {
        const createMessage = new CreateMessageService();

        await createMessage.execute({ message });

        emitMessages(socket);
    });

    socket.on('remove_message', async (messageId) => {
        const deleteMessage = new DeleteMessageService();

        await deleteMessage.execute(messageId);

        emitMessages(socket);
    });
});

io.listen(3000);
