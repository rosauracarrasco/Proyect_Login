const express = require("express");
const { 
    obtenerReservas, 
    agregarReserva, 
    editarReserva, 
    eliminarReserva 
} = require("../controllers/reservas");

const router = express.Router();

router.get("/", obtenerReservas);
router.post("/", agregarReserva);
router.put("/:id", editarReserva);
router.delete("/:id", eliminarReserva);

module.exports = router;
