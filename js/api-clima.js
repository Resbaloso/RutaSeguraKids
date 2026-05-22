"use strict";

const apiKey = "4680ff7ebfb03979ac1168e160587246";
const ciudadOperacion = "Bucaramanga";
const urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadOperacion}&appid=${apiKey}&units=metric&lang=es`;
const contenedorClima = document.getElementById("widget-clima");

async function obtenerClima() {
    try {
        const respuesta = await fetch(urlClima);
        if (!respuesta.ok) {
            throw new Error("Error en la conexión con OpenWeather");
        }
        const datos = await respuesta.json();
        renderizarClima(datos);
    } catch (error) {
        contenedorClima.innerHTML = `<h3>El clima no está disponible</h3>`;
    }
}

function renderizarClima(datos) {
    const temperatura = Math.round(datos.main.temp);
    const descripcion = datos.weather[0].description;
    const icono = datos.weather[0].icon;

    contenedorClima.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="Icono clima">
        <h3>Clima en ${datos.name}</h3>
        <h2>${temperatura}°C</h2>
        <p style="text-transform: capitalize;">${descripcion}</p>
    `;
}

document.addEventListener("DOMContentLoaded", obtenerClima);