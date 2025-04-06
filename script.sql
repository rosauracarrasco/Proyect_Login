-- Crear tabla de Usuarios
CREATE TABLE Usuarios (
                          id INT PRIMARY KEY IDENTITY(1,1),
                          nombre VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL UNIQUE,
                          password VARCHAR(255) NOT NULL,
                          creado DATETIME DEFAULT GETDATE(),
                          edad INT NOT NULL
);

-- Crear tabla de Habitaciones
CREATE TABLE Habitaciones (
                              id INT PRIMARY KEY IDENTITY(1,1),
                              numero INT NOT NULL UNIQUE,
                              tipo VARCHAR(255) NOT NULL,
                              capacidad INT NOT NULL,
                              precio DECIMAL(10, 2) NOT NULL,
                              estado VARCHAR(255) NOT NULL
);

-- Crear tabla de Reservas
CREATE TABLE Reservas (
                          id INT PRIMARY KEY IDENTITY(1,1),
                          nombreCliente VARCHAR(255) NOT NULL,
                          fechaEntrada DATETIME NOT NULL,
                          fechaSalida DATETIME NOT NULL,
                          numeroHabitacion INT NOT NULL,
                          estado VARCHAR(255) DEFAULT 'pendiente',

                          FOREIGN KEY (numeroHabitacion) REFERENCES Habitaciones(numero)
                              ON DELETE CASCADE
                              ON UPDATE CASCADE
);
