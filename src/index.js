require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const path = require("path");

// Importing routes from ./apis.js
const API = require("./apis");

// Importing database configuration
const config = require("./config");
const ConnectDatabase = require("./config/database");

// Create an Express app
const app = express();
const port = Number(process.env.HTTP_PORT || 5005);

// Apply middleware
app.use(cors({ origin: "*", methods: ["POST", "GET"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "client", "build")));

// Define routes
const router = express.Router();
API(router);
app.use("/api", router);

// Welcome message route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API!" });
});

// Serve the React application for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Connect to MongoDB database
ConnectDatabase(String(config.mongoURI));

// Start the server
const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// Initialize Socket.IO
const httpServer = createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Handle socket connections
io.on("connection", (socket) => {
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  socket.on("message", function (message) {
    console.log(message);
    io.emit("message", message);
  });
  socket.on("vote_update", function (message) {
    console.log(message);
    io.emit("vote_update", message);
  });
  socket.on("vote_close", function (message) {
    console.log(message);
    io.emit("vote_close", message);
  });
});

// Start listening for Socket.IO connections
httpServer.listen(4000, () => {
  console.log("Socket.IO server listening on port 4000");
});
