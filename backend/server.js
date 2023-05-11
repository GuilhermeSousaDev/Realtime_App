const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { 
    cors: {
        origin: 'http://localhost:5173',
    },
});

io.on('connection', (socket) => {
    const messages = [];
    socket.emit('message', messages);

    socket.on('chat', (message) => {
        messages.push(message);
        socket.emit('message', messages);
    });

    socket.on('disconnect', () => {
        console.log("Disconected");
    });
});

server.listen(3000, () => console.log("Iniciado"))
