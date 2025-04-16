const { poolPromise, sql } = require("../config/db");

// Obtener todas las reservas
const obtenerReservas = async (req, res) => {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request().query("SELECT * FROM Reservas");
        res.json(resultado.recordset);
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Agregar una nueva reserva
const agregarReserva = async (req, res) => {
    try {
        const { nombreCliente, fechaEntrada, fechaSalida, numeroHabitacion } = req.body;

        if (!nombreCliente || !fechaEntrada || !fechaSalida || !numeroHabitacion) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input("nombreCliente", sql.VarChar, nombreCliente)
            .input("fechaEntrada", sql.Date, fechaEntrada)
            .input("fechaSalida", sql.Date, fechaSalida)
            .input("numeroHabitacion", sql.Int, numeroHabitacion)
            .input("estado", sql.VarChar, "Reservado")
            .query(`INSERT INTO Reservas 
                    (nombreCliente, fechaEntrada, fechaSalida, numeroHabitacion, estado) 
                    VALUES (@nombreCliente, @fechaEntrada, @fechaSalida, @numeroHabitacion, @estado)`);

        res.json({ mensaje: "Reserva registrada correctamente" });
    } catch (error) {
        console.error("Error al agregar reserva:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Editar una reserva
const editarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCliente, fechaEntrada, fechaSalida, numeroHabitacion, estado } = req.body;

        const pool = await poolPromise;
        await pool.request()
            .input("id", sql.Int, id)
            .input("nombreCliente", sql.VarChar, nombreCliente)
            .input("fechaEntrada", sql.Date, fechaEntrada)
            .input("fechaSalida", sql.Date, fechaSalida)
            .input("numeroHabitacion", sql.Int, numeroHabitacion)
            .input("estado", sql.VarChar, estado)
            .query(`UPDATE Reservas SET 
                        nombreCliente = @nombreCliente, 
                        fechaEntrada = @fechaEntrada, 
                        fechaSalida = @fechaSalida, 
                        numeroHabitacion = @numeroHabitacion, 
                        estado = @estado 
                    WHERE id = @id`);

        res.json({ mensaje: "Reserva actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar reserva:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Eliminar una reserva
const eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;
        await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Reservas WHERE id = @id");

        res.json({ mensaje: "Reserva eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar reserva:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

module.exports = { obtenerReservas, agregarReserva, editarReserva, eliminarReserva };
