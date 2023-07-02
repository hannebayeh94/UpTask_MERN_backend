import express from "express";
import conectarDb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareasRoutes from "./routes/tareaRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
conectarDb();

// configurar cors
const whiteList = [process.env.FRONTEND_URL];

const corsOpcion = {
  origin: function (origin, callback) {
    console.log(origin);

    if (whiteList.includes(origin)) {
      // puede consultar la api
      callback(null, true);
    } else {
      // no esta permitido su req
      callback(new Error("Error de cors"));
    }
  },
};

app.use(cors(corsOpcion));

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareasRoutes);

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriend en el puerto ${PORT}`);
});

// socket io

import { Server, Socket } from "socket.io";

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  console.log("Conectado a socket");

  // definiar los evnetos de socket
  socket.on("Abrir proyecto", (proyecto) => {
    socket.join(proyecto);

    socket.emit("respuesta", { nombre: "Hanne" });
  });

  socket.on("nueva tarea", (tarea) => {
    const proyecto = tarea.proyecto;
    socket.to(proyecto).emit("tarea agreada", tarea);
    console.log("agregada");
  });

  socket.on("eliminar tarea", (tarea) => {
    const proyecto = tarea.proyecto;
    socket.to(proyecto).emit("tarea eliminada", tarea);
  });

  socket.on("actualizar tarea", (tarea) => {
    const proyecto = tarea.proyecto._id;
    socket.to(proyecto).emit("tarea actualizada", tarea);
  });

  socket.on("cambiar estado", (tarea) => {
    const proyecto = tarea.proyecto._id;
    socket.to(proyecto).emit("nuevo estado", tarea);
  });
});
