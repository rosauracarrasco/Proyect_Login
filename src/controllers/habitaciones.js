const { poolPromise, sql } = require("../config/db");

// Obtener todas las habitaciones
const obtenerHabitaciones = async (req, res) => {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request().query("SELECT * FROM Habitaciones");
        res.json(resultado.recordset);
    } catch (error) {
        console.error("Error al obtener habitaciones:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

const agregarHabitacion = async (req, res) => {
    try {
        const { numero, tipo, capacidad, precio, estado } = req.body;

        if (!numero || !tipo || !capacidad || !precio || !estado) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const pool = await poolPromise;

        if (!pool) {
            return res.status(500).json({ mensaje: "No se pudo establecer la conexión con la base de datos" });
        }

        await pool.request()
            .input("numero", sql.Int, numero)
            .input("tipo", sql.VarChar, tipo)
            .input("capacidad", sql.Int, capacidad)
            .input("precio", sql.Decimal(10, 2), precio)
            .input("estado", sql.VarChar, estado)
            .query("INSERT INTO Habitaciones (numero, tipo, capacidad, precio, estado) VALUES (@numero, @tipo, @capacidad, @precio, @estado)");

        res.json({ mensaje: "Habitación agregada correctamente" });
    } catch (error) {
        console.error("Error al agregar habitación:", error);
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

// Editar habitación
const editarHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo, capacidad, precio, estado } = req.body;

        const pool = await poolPromise;
        await pool.request()
            .input("id", sql.Int, id)
            .input("tipo", sql.VarChar, tipo)
            .input("capacidad", sql.Int, capacidad)
            .input("precio", sql.Decimal(10, 2), precio)
            .input("estado", sql.VarChar, estado)
            .query("UPDATE Habitaciones SET tipo = @tipo, capacidad = @capacidad, precio = @precio, estado = @estado WHERE id = @id");

        res.json({ mensaje: "Habitación actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar habitación:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Eliminar habitación
const eliminarHabitacion = async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;
        await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Habitaciones WHERE id = @id");

        res.json({ mensaje: "Habitación eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar habitación:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

module.exports = {
    obtenerHabitaciones,
    agregarHabitacion,
    editarHabitacion,
    eliminarHabitacion
};
