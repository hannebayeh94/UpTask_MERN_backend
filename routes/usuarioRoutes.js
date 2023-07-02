import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/UsuarioController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

// Autenticacion, registro y confirmacion de usuarios

router.post("/", registrar); //Crea un nuevo usuario
router.post("/login", autenticar); //Ciniciar sesion
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);
router.get("/olvide-password/:token", nuevoPassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
router.get("/perfil", checkAuth, perfil);

export default router;
