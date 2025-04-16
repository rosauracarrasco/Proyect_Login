const express = require("express");
const { obtenerUsuarios, agregarUsuario, editarUsuario, eliminarUsuario } = require("../controllers/usuarios");

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", agregarUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
