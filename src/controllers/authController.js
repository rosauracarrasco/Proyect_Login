// src/controllers/authController.js
const { poolPromise, sql } = require("../config/db");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, password)
      .query("SELECT * FROM Usuarios WHERE email = @username AND password = @password");

    if (result.recordset.length > 0) {
      res.redirect("/reservas");
    } else {
      res.status(401).send("Credenciales incorrectas");
    }
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).send("Error del servidor");
  }
};

module.exports = { login };
