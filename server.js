import express from "express";
import next from "next";
import http from "http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);
  const io = new Server(server);

  const onlineDevices = {
    controller: false,
    mc: false,
    viewer: false,
    A: false,
    B: false,
    C: false,
    D: false,
  };

  io.on("connection", (socket) => {
    const { role, pos } = socket.handshake.query;
    const deviceKey = role === "contestant" ? pos : role;

    if (deviceKey && onlineDevices.hasOwnProperty(deviceKey)) {
      onlineDevices[deviceKey] = true;
      socket.deviceKey = deviceKey;
    }

    io.emit("connection:status", onlineDevices);

    socket.on("disconnect", () => {
      if (socket.deviceKey) {
        onlineDevices[socket.deviceKey] = false;

        io.emit("connection:status", onlineDevices);
      }
    });
  });

  expressApp.use((req, res) => handle(req, res));
  server.listen(port, () => {
    console.log(`> Server sẵn sàng tại: http://localhost:${port}`);
  });
});
