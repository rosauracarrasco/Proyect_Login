# Sistema de Reservas - Hotel Eclipse

## 📌 Descripción del Proyecto

El Sistema de Reservas para el **Hotel Eclipse** es una plataforma web que permite gestionar las reservas de habitaciones del hotel. Los usuarios pueden realizar reservas, consultar la disponibilidad, ver detalles de las habitaciones y gestionar sus reservas de manera eficiente.

Este sistema permite:
- Gestionar habitaciones del hotel (agregar, editar, eliminar).
- Realizar y administrar reservas de clientes.
- Consultar el estado de reservas y detalles de habitaciones.
- Comunicación entre un servidor Node.js y una base de datos SQL Server.

---

## 🧰 Tecnologías Utilizadas

- **Node.js** – Entorno de ejecución backend.
- **Express.js** – Framework para gestionar rutas y middleware.
- **SQL Server** – Base de datos relacional para el almacenamiento.
- **mssql** – Cliente de Node.js para conectarse a SQL Server.
- **dotenv** – Manejo de variables de entorno.
- **Fetch API** – Solicitudes HTTP desde el cliente.
- **HTML, CSS, JavaScript** – Para la interfaz de usuario.

---

## 📁 Estructura del Proyecto

---

## 🚀 Avance del Proyecto

Actualmente implementado:

✅ Gestión de habitaciones  
✅ Visualización y control de reservas  
✅ Interfaz básica para usuarios y admins  
✅ Conexión con base de datos SQL Server

Por implementar:

🔜 Sistema de pagos  
🔜 Correos de confirmación y alertas  
🔜 Panel de administración  
🔜 Seguridad con autenticación

---

## 🧾 Tablas de la Base de Datos

### 🛏️ Tabla: `Habitaciones`

| Columna   | Tipo             | Descripción                                      |
|-----------|------------------|--------------------------------------------------|
| id        | INT (PK)         | Identificador único de la habitación             |
| numero    | INT              | Número de la habitación                          |
| tipo      | VARCHAR(255)     | Tipo de habitación (individual, doble, etc.)     |
| capacidad | INT              | Capacidad de personas                            |
| precio    | DECIMAL(10,2)    | Precio por noche                                 |
| estado    | VARCHAR(255)     | Estado (disponible, ocupada, mantenimiento)      |

---

### 📆 Tabla: `Reservas`

| Columna         | Tipo             | Descripción                                         |
|-----------------|------------------|-----------------------------------------------------|
| id              | INT (PK)         | Identificador único de la reserva                   |
| nombreCliente   | VARCHAR(255)     | Nombre del cliente que hace la reserva              |
| fechaEntrada    | DATETIME         | Fecha de entrada                                    |
| fechaSalida     | DATETIME         | Fecha de salida                                     |
| numeroHabitacion| INT (FK)         | Número de la habitación (relación con `Habitaciones`) |
| estado          | VARCHAR(255)     | Estado de la reserva (confirmada, pendiente, etc.)  |

---

## 🔗 Relación entre Tablas

- Una **habitación** puede tener **muchas reservas**.
- Una **reserva** solo pertenece a **una habitación**.

---

## 👤 Autor

Desarrollado por **Alexis Tejada Chung**
Desarrollado por **Rosaura Carrasco Montalvan**

---

