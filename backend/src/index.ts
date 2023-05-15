import "reflect-metadata";
import "./typeorm";
import { io } from "./server";

io.on('connection', socket => {
    let messages = [];

    console.log('User Connected');

    socket.emit('message', messages);

    socket.on('chat', (message: string) => {
        messages.push(message);
        socket.emit('message', messages);
    });
});

io.listen(3000);


