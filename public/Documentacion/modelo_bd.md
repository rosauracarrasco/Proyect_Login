# 🏗️ Modelo de Base de Datos

Este documento describe la estructura de la base de datos utilizada en el proyecto.

## 📌 Tabla: `at_usuarios`

Esta tabla almacena la información de los usuarios registrados en el sistema.

### 📊 Estructura de la tabla

| Nombre de la columna | Tipo de dato          | Nulo | Predeterminado | Descripción |
|----------------------|----------------------|------|---------------|-------------|
| `id`                | INT(11) AUTO_INCREMENT | NO   | NULL          | Identificador único del usuario. |
| `nombre`            | VARCHAR(150)          | SÍ   | NULL          | Nombre del usuario. |
| `email`             | VARCHAR(250)          | SÍ   | NULL          | Correo electrónico del usuario. |
| `pass`              | VARCHAR(250)          | SÍ   | NULL          | Contraseña cifrada del usuario. |
| `rol`               | INT(2)                | SÍ   | NULL          | Rol del usuario (1 = Admin, 2 = Usuario normal, etc.). |
| `status`            | INT(1)                | SÍ   | 1             | Estado del usuario (1 = Activo, 0 = Inactivo). |
| `created_at`        | TIMESTAMP             | NO   | CURRENT_TIMESTAMP | Fecha de creación del usuario. |
| `updated_at`        | DATETIME              | SÍ   | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Última actualización. |

### 📌 Diagrama de la tabla `at_usuarios`

```plaintext
+-------------+--------------+------+-----+-------------------+-------------------+
| Campo       | Tipo         | Nulo | Key | Predeterminado    | Extra             |
+-------------+--------------+------+-----+-------------------+-------------------+
| id          | int(11)      | NO   | PRI | NULL              | AUTO_INCREMENT    |
| nombre      | varchar(150) | SÍ   |     | NULL              |                   |
| email       | varchar(250) | SÍ   |     | NULL              |                   |
| pass        | varchar(250) | SÍ   |     | NULL              |                   |
| rol         | int(2)       | SÍ   |     | NULL              |                   |
| status      | int(1)       | SÍ   |     | 1                 |                   |
| created_at  | timestamp    | NO   |     | CURRENT_TIMESTAMP |                   |
| updated_at  | datetime     | SÍ   |     | CURRENT_TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP |
+-------------+--------------+------+-----+-------------------+-------------------+
```

## 📜 Relación con otras tablas

Si en el futuro se agregan más tablas relacionadas, se puede establecer relaciones mediante **claves foráneas (FOREIGN KEY)**.

