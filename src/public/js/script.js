document.addEventListener("DOMContentLoaded", () => {
    cargarUsuarios();
});

const formUsuario = document.getElementById("formUsuario");
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const edadInput = document.getElementById("edad");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");

let usuarioEditando = null; // Para saber si estamos editando o creando uno nuevo

formUsuario.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!nombreInput.value || !emailInput.value || (!passwordInput.value && !usuarioEditando) || !edadInput.value) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const usuario = {
        nombre: nombreInput.value,
        email: emailInput.value,
        edad: parseInt(edadInput.value),
        password: usuarioEditando ? undefined : passwordInput.value // Solo enviar contraseña en nuevo usuario
    };

    try {
        let respuesta, datos;

        if (usuarioEditando) {
            respuesta = await fetch(`/api/usuarios/${usuarioEditando}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            });
            datos = await respuesta.json();
            usuarioEditando = null;
            btnGuardar.textContent = "Guardar";
            btnCancelar.classList.add("hidden");
        } else {
            respuesta = await fetch("/api/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            });
            datos = await respuesta.json();
        }

        alert(datos.mensaje);
        formUsuario.reset();
        passwordInput.disabled = false;
        cargarUsuarios();
    } catch (error) {
        console.error("Error al guardar usuario:", error);
    }
});

// Cargar usuarios en la tabla
async function cargarUsuarios() {
    try {
        const respuesta = await fetch("/api/usuarios");
        const usuarios = await respuesta.json();
        tablaUsuarios.innerHTML = "";

        usuarios.forEach(usuario => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.edad}</td>
                <td>
                    <button class="editar" data-id="${usuario.id}">Editar</button>
                    <button class="eliminar" data-id="${usuario.id}">Eliminar</button>
                </td>
            `;

            tablaUsuarios.appendChild(fila);
        });

        document.querySelectorAll(".eliminar").forEach(boton => {
            boton.addEventListener("click", eliminarUsuario);
        });

        document.querySelectorAll(".editar").forEach(boton => {
            boton.addEventListener("click", editarUsuario);
        });

    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
}

// Eliminar usuario
async function eliminarUsuario(e) {
    const id = e.target.dataset.id;
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

    try {
        const respuesta = await fetch(`/api/usuarios/${id}`, { method: "DELETE" });
        const datos = await respuesta.json();
        alert(datos.mensaje);
        cargarUsuarios();
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
}

// Editar usuario
function editarUsuario(e) {
    usuarioEditando = e.target.dataset.id;
    const fila = e.target.closest("tr");

    nombreInput.value = fila.children[0].textContent;
    emailInput.value = fila.children[1].textContent;
    edadInput.value = fila.children[2].textContent;
    passwordInput.disabled = true;

    btnGuardar.textContent = "Actualizar";
    btnCancelar.classList.remove("hidden");
}

// Cancelar edición
btnCancelar.addEventListener("click", () => {
    usuarioEditando = null;
    formUsuario.reset();
    passwordInput.disabled = false;
    btnGuardar.textContent = "Guardar";
    btnCancelar.classList.add("hidden");
});
