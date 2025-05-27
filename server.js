const http = require("http");
const WebSocket = require("ws");
const app = require("./app");
const { handleMessage } = require("./controllers/chatController");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    handleMessage(ws, message);
  });

  ws.on("close", () => {
    console.log("클라이언트와 접속 닫힘");
  });
});

server.listen(3333, "0.0.0.0", () => {
  console.log("Server is running on http://localhost:3333");
});
