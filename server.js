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

  const activeClients = new Map();

  const broadcastActiveRoles = () => {
    const activeRoles = Array.from(activeClients.values());
    io.emit("clients-update", activeRoles);
  };

  io.on("connection", (socket) => {
    const { role, pos } = socket.handshake.query;

    let roleKey = role;
    if (role === "contestant" && pos) {
      roleKey = `contestant-${pos}`;
    }

    if (roleKey) {
      socket.role = roleKey;
      activeClients.set(socket.id, roleKey);
      console.log(`🟢 [ONLINE] ${roleKey} (ID: ${socket.id})`);
    }

    broadcastActiveRoles();

    socket.on("update-scores", (data) => {
      socket.broadcast.emit("scores-updated", data);
    });

    socket.on("disconnect", () => {
      if (socket.role) {
        console.log(`🔴 [OFFLINE] ${socket.role}`);
      }
      activeClients.delete(socket.id);
      broadcastActiveRoles();
    });
  });

  expressApp.use((req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`> Server Olympia sẵn sàng tại: http://localhost:${port}`);
  });
});
