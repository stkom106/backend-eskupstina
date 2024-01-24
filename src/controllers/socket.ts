import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

// socket.emit("message", "message")
io.on("connection", (socket: any) => {
    socket.on("message", function (message: any) {
        console.log(message)
        socket.broadcast.emit('message', message);
        // io.serverSideEmit("message", "world");
        // socket.emit("message", message)
    })

});


io.emit("message", "check this");
io.listen(4000);