document.addEventListener("DOMContentLoaded", () => {
    const habitacionesTable = document.querySelector("#habitacionesTable tbody");
    const addHabitacionForm = document.getElementById("addHabitacionForm");
    const editHabitacionModal = document.getElementById("editHabitacionModal");
    const closeModal = document.getElementById("closeModal");
    const editHabitacionForm = document.getElementById("editHabitacionForm");

    // Obtener todas las habitaciones
    const getHabitaciones = async () => {
        const response = await fetch("/api/habitaciones");
        const habitaciones = await response.json();
        habitacionesTable.innerHTML = "";
        habitaciones.forEach(habitacion => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${habitacion.numero}</td>
                <td>${habitacion.tipo}</td>
                <td>${habitacion.capacidad}</td>
                <td>${habitacion.precio}</td>
                <td>${habitacion.estado}</td>
                <td>
                    <button onclick="editHabitacion(${habitacion.id})">Editar</button>
                    <button onclick="deleteHabitacion(${habitacion.id})">Eliminar</button>
                </td>
            `;
            habitacionesTable.appendChild(tr);
        });
    };

    // Agregar una nueva habitación
    addHabitacionForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const numero = document.getElementById("numero").value;
        const tipo = document.getElementById("tipo").value;
        const capacidad = document.getElementById("capacidad").value;
        const precio = document.getElementById("precio").value;
        const estado = document.getElementById("estado").value;

        const response = await fetch("/api/habitaciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                numero,
                tipo,
                capacidad,
                precio,
                estado,
            }),
        });

        if (response.ok) {
            getHabitaciones(); // Recargar las habitaciones
            addHabitacionForm.reset(); // Limpiar formulario
        }
    });

    // Editar habitación
    window.editHabitacion = (id) => {
        const habitacion = [...habitacionesTable.rows].find(row => row.cells[0].innerText == id);
        const tipo = habitacion.cells[1].innerText;
        const capacidad = habitacion.cells[2].innerText;
        const precio = habitacion.cells[3].innerText;
        const estado = habitacion.cells[4].innerText;

        document.getElementById("editId").value = id;
        document.getElementById("editTipo").value = tipo;
        document.getElementById("editCapacidad").value = capacidad;
        document.getElementById("editPrecio").value = precio;
        document.getElementById("editEstado").value = estado;

        editHabitacionModal.style.display = "block";
    };

    // Cerrar el modal
    closeModal.addEventListener("click", () => {
        editHabitacionModal.style.display = "none";
    });

    // Guardar cambios de edición
    editHabitacionForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("editId").value;
        const tipo = document.getElementById("editTipo").value;
        const capacidad = document.getElementById("editCapacidad").value;
        const precio = document.getElementById("editPrecio").value;
        const estado = document.getElementById("editEstado").value;

        const response = await fetch(`/api/habitaciones/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tipo,
                capacidad,
                precio,
                estado,
            }),
        });

        if (response.ok) {
            getHabitaciones(); // Recargar las habitaciones
            editHabitacionModal.style.display = "none"; // Cerrar el modal
        }
    });

    // Eliminar habitación
    window.deleteHabitacion = async (id) => {
        const response = await fetch(`/api/habitaciones/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            getHabitaciones(); // Recargar las habitaciones
        }
    };

    // Inicializar la lista de habitaciones
    getHabitaciones();
});
