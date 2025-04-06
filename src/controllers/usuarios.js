const { poolPromise, sql } = require("../config/db");

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const pool = await poolPromise;
        const resultado = await pool.request().query("SELECT * FROM Usuarios");
        res.json(resultado.recordset);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Agregar un nuevo usuario
const agregarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, edad } = req.body;

        if (!nombre || !email || !password || !edad) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input("nombre", sql.VarChar, nombre)
            .input("email", sql.VarChar, email)
            .input("password", sql.VarChar, password)
            .input("edad", sql.Int, edad)
            .query("INSERT INTO Usuarios (nombre, email, password, edad) VALUES (@nombre, @email, @password, @edad)");

        res.json({ mensaje: "Usuario agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Editar usuario
const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, edad } = req.body;

        const pool = await poolPromise;
        await pool.request()
            .input("id", sql.Int, id)
            .input("nombre", sql.VarChar, nombre)
            .input("email", sql.VarChar, email)
            .input("edad", sql.Int, edad)
            .query("UPDATE Usuarios SET nombre = @nombre, email = @email, edad = @edad WHERE id = @id");

        res.json({ mensaje: "Usuario actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

// Eliminar usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;
        await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Usuarios WHERE id = @id");

        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

module.exports = { obtenerUsuarios, agregarUsuario, editarUsuario, eliminarUsuario };
