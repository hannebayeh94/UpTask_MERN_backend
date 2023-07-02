import express from "express";

import {
  obtenerProyectos,
  nuevoProyecto,
  ObtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  BuscarColaborador,
} from "../controllers/ProyectoController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, obtenerProyectos); //OBtener los proyectos
router.post("/", checkAuth, nuevoProyecto); //Crear un proyectto
router
  .route("/:id")
  .get(checkAuth, ObtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

router.post("/colaboradores", checkAuth, BuscarColaborador);
router.post("/colaboradores/:id", checkAuth, agregarColaborador);
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router;
