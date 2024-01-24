require("dotenv").config();
import express, { Express } from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

// External Modules
import API from "./src/apis";
import config from "./src/config";
import ConnectDatabase from "./src/config/database";


// Get router
const router = express.Router();

const app: Express = express();
const port: Number = Number(process.env.HTTP_PORT || 5005);

app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend Load
// app.use(express.static(__dirname + "/build"));
// app.get("/*", function (req: any, res: any) {
//     res.sendFile(__dirname + "/build/index.html", function (err: any) {
//         if (err) {
//             res.status(500).send(err);
//         }
//     });
// });

// API Router
API(router);
app.use("/api", router);



ConnectDatabase(config.mongoURI);
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});



const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

// socket.emit("message", "message")
io.on("connection", (socket: any) => {
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on("message", function (message: any) {
        console.log(message)
        io.emit('message', message);
        // io.serverSideEmit("message", "world");
        // socket.emit("message", message)
    })
    socket.on("vote_update", function (message: any) {
        console.log(message)
        io.emit('vote_update', message);
    })

    socket.on("vote_close", function (message: any) {
        console.log(message)
        io.emit('vote_close', message);
    })

});

io.listen(4000);
