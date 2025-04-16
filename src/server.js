const express = require("express");
const cors = require("cors");
const path = require("path");
const usuariosRouter = require("./routes/usuarios");
const reservasRouter = require("./routes/reservas");
const habitacionesRouter = require("./routes/habitaciones");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/usuarios", usuariosRouter);
app.use("/api/reservas", reservasRouter);
app.use("/api/habitaciones", habitacionesRouter);
app.use("/api/auth", authRouter);

// Páginas HTML
app.get("/usuarios", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "usuario.html"));
});
app.get("/habitaciones", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "habitaciones.html"));
});
app.get("/reservas", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "reserva.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
