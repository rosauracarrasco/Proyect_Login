const express = require("express");
const {
    obtenerHabitaciones,
    agregarHabitacion,
    editarHabitacion,
    eliminarHabitacion
} = require("../controllers/habitaciones");

const router = express.Router();

router.get("/", obtenerHabitaciones);
router.post("/", agregarHabitacion);
router.put("/:id", editarHabitacion);
router.delete("/:id", eliminarHabitacion);

module.exports = router;
