const server = require("http").createServer((request, response) => {
  response.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    // "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
  });
  response.end("hey there!");
});

const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("join-room", (roomId, userId) => {
    // adiciona os usuarios na mesma sala
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("disconnect", () => {
      console.log("disconnected!", roomId, userId);
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

const startServer = () => {
  const { address, port } = server.address();
  console.log(`app running at ${address}:${port}`);
};

server.listen(process.env.PORT || 3000, startServer);
