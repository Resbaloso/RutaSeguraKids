"use strict";

const urlConductores = "https://jsonplaceholder.typicode.com/users";
const selectConductores = document.getElementById("nombre-conductor");

async function cargarConductores() {
    try {
        const respuesta = await fetch(urlConductores);
        if (!respuesta.ok) {
            throw new Error("Error al consultar la API de conductores");
        }
        const datos = await respuesta.json();
        renderizarConductores(datos);
    } catch (error) {
        selectConductores.innerHTML = '<option value="" disabled selected>Error al cargar conductores</option>';
    }
}

function renderizarConductores(conductores) {
    selectConductores.innerHTML = '<option value="" disabled selected>Seleccione un conductor...</option>';
    conductores.forEach(conductor => {
        const opcion = document.createElement("option");
        opcion.value = conductor.name;
        opcion.textContent = conductor.name;
        selectConductores.appendChild(opcion);
    });
}

document.addEventListener("DOMContentLoaded", cargarConductores);