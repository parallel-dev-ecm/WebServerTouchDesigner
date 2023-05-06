const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const osc = require("osc");
const cors = require("cors");

const app = express();
app.use(express.static(__dirname));

app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "https://carlosemiliocortesma-default-ecm.dev.8thwall.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const oscPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 8080, // Make sure this matches the OSC port in TouchDesigner
});

oscPort.on("message", (oscMessage) => {
  console.log("OSC message received:", oscMessage);

  const msgString = JSON.stringify(oscMessage);
  io.emit("oscMessage", msgString);
});

oscPort.on("error", (err) => {
  console.error("OSC error:", err);
});

oscPort.open();

server.listen(8081, () => {
  console.log("WebSocket server running on http://192.168.68.51:8081");
  console.log("OSC server listening on UDP port 8080");
});
