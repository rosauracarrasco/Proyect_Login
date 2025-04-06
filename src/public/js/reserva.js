const formulario = document.getElementById("formReserva");
const tabla = document.getElementById("tablaReservas");
const habitacionSelect = document.getElementById("habitacionSelect");

const cargarHabitaciones = () => {
    fetch("/api/habitaciones")
        .then(res => res.json())
        .then(habitaciones => {
            habitacionSelect.innerHTML = "<option value='' disabled selected>Selecciona una habitación</option>"; // Limpiar el select

            habitaciones.forEach(h => {
                habitacionSelect.innerHTML += `
                    <option value="${h.id}">Habitación ${h.numero} - ${h.tipo} - $${h.precio}</option>
                `;
            });
        })
        .catch(error => console.error("Error al cargar las habitaciones:", error));
};

const cargarReservas = () => {
    fetch("/api/reservas")
        .then(res => res.json())
        .then(reservas => {
            tabla.innerHTML = "";
            reservas.forEach(r => {
                tabla.innerHTML += `
                    <tr>
                        <td>${r.nombreCliente}</td>
                        <td>${r.fechaEntrada.split("T")[0]}</td>
                        <td>${r.fechaSalida.split("T")[0]}</td>
                        <td>${r.numeroHabitacion}</td>
                        <td>${r.estado}</td>
                        <td>
                            <button onclick="eliminarReserva(${r.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        });
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const reserva = {
        nombreCliente: document.getElementById("nombreCliente").value,
        fechaEntrada: document.getElementById("fechaEntrada").value,
        fechaSalida: document.getElementById("fechaSalida").value,
        numeroHabitacion: habitacionSelect.value,
    };

    fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva)
    })
    .then(res => res.json())
    .then(() => {
        formulario.reset();
        cargarReservas();
    });
});

const eliminarReserva = (id) => {
    fetch(`/api/reservas/${id}`, {
        method: "DELETE"
    })
    .then(() => cargarReservas());
};
cargarHabitaciones();
cargarReservas();
