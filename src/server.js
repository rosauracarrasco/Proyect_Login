const express = require("express");
const cors = require("cors");
const path = require("path");
const usuariosRouter = require("./routes/usuarios");
const reservasRoutes = require("./routes/reservas");
const habitacionesRoutes = require("./routes/habitaciones");

const app = express();

// Middleware para permitir CORS
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Rutas de la API
app.use("/api/usuarios", usuariosRouter);
app.use("/api/reservas", reservasRoutes);
app.use("/api/habitaciones", habitacionesRoutes);

app.get("/usuarios", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "usuario.html"));
});
app.get("/habitaciones", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "habitaciones.html"));
});

// Ruta para servir el archivo de reservas cuando accedes a la raíz
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "reserva.html"));  // Asegúrate de que el nombre del archivo sea correcto
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
