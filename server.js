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
    io.emit("clients-update", Array.from(activeClients.values()));
  };

  io.on("connection", (socket) => {
    socket.on("register", ({ role, pos }) => {
      let roleKey = role;

      if (role === "contestant" && pos) {
        roleKey = `contestant-${pos}`;
      }

      socket.role = roleKey;
      activeClients.set(socket.id, roleKey);

      broadcastActiveRoles();

      console.log(`🟢 [ONLINE] ${roleKey}`);
    });

    broadcastActiveRoles();

    socket.on("stage-change", (stage) => {
      io.emit("stage-change", stage);
    });

    socket.on("update-scores", (scores) => {
      io.emit("scores-updated", scores);
    });

    socket.on("kd-state", (state) => {
      io.emit("kd-state", state);
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
