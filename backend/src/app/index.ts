import "reflect-metadata";
import "./typeorm";
import { io } from "./server";
import CreateMessageService from "../services/CreateMessageService";
import ListMessagesService from "../services/ListMessagesService";

io.on('connection', async (socket) => {
    console.log('User Connected');

    const listMessages = new ListMessagesService();
    const messages = await listMessages.execute();

    socket.emit('message', messages);

    socket.on('chat', async (message: string) => {
        const createMessage = new CreateMessageService();

        await createMessage.execute({ message });

        const messages = await listMessages.execute();

        socket.emit('message', messages);
    });

    socket.on('remove_message', (messageId) => console.log(messageId));
});

io.listen(3000);
