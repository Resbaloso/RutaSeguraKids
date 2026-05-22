"use strict";

let rutasGuardadas = JSON.parse(localStorage.getItem("rutas")) || [];

const hamburguer = document.querySelector(".hamburguer");
const navMenu = document.querySelector(".nav-menu");
const Bachyon = document.getElementById("Bachyon");
const yaaaa = new Audio('/assets/snd/yaaaa.mp3');
const seccionInicio = document.querySelector(".seccion-inicio-clima");

const imagenesFondo = [
    "url('/assets/img/carrusel1.jpg')",
    "url('/assets/img/carrusel2.webp')",
    "url('/assets/img/carrusel3.webp')"
];

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("active");
    navMenu.classList.toggle("active");
});

Bachyon.addEventListener("mouseover", function () {
    this.src = "/assets/img/Bachyon_screm.webp";
    yaaaa.play();
});

Bachyon.addEventListener("mouseout", function () {
    this.src = "/assets/img/Bachyon.webp";
    yaaaa.pause();
    yaaaa.currentTime = 0;
});

const templateRuta = document.createElement('template');
templateRuta.innerHTML = `
<style>
    .tarjeta-ruta {
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(224, 224, 224);
        border-top: 5px solid rgb(18, 227, 70);
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 10px hsla(0, 0%, 0%, 0.05);
        font-family: system-ui, sans-serif;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .titulo {
        color: rgb(10, 9, 61);
        font-size: 20px;
        margin-bottom: 15px;
        margin-top: 0;
    }
    .info {
        color: rgb(85, 85, 85);
        font-size: 14px;
        margin-bottom: 8px;
    }
    .info strong {
        color: rgb(51, 51, 51);
    }
    .estudiantes-contenedor {
        margin-top: 15px;
        flex-grow: 1;
    }
    .estudiantes-titulo {
        font-size: 14px;
        color: rgb(10, 9, 61);
        border-bottom: 1px solid #12E346;
        padding-bottom: 5px;
        margin-bottom: 10px;
    }
    .lista-estudiantes {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .lista-estudiantes li {
        background-color: rgb(249, 249, 249);
        padding: 8px;
        border-radius: 4px;
        margin-bottom: 5px;
        font-size: 13px;
        color: rgb(51, 51, 51);
        border-left: 3px solid rgb(10, 9, 61);
    }
</style>
<div class="tarjeta-ruta">
    <h3 class="titulo" id="t-nombre"></h3>
    <div class="info"><strong>Conductor:</strong> <span id="t-conductor"></span></div>
    <div class="info"><strong>Salida:</strong> <span id="t-hora"></span></div>
    <div class="estudiantes-contenedor">
        <div class="estudiantes-titulo"><strong>Estudiantes Asignados:</strong></div>
        <ul class="lista-estudiantes" id="t-estudiantes"></ul>
    </div>
</div>
`;

class RouteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(templateRuta.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.getElementById("t-nombre").textContent = this.getAttribute("nombre");
        this.shadowRoot.getElementById("t-conductor").textContent = this.getAttribute("conductor");
        this.shadowRoot.getElementById("t-hora").textContent = this.getAttribute("hora");
    }

    agregarEstudiante(nombreEstudiante) {
        const lista = this.shadowRoot.getElementById("t-estudiantes");
        const li = document.createElement("li");
        li.textContent = nombreEstudiante;
        lista.appendChild(li);
    }
}

customElements.define("route-card", RouteCard);

const formularioRuta = document.getElementById("formulario-ruta");
const formularioEstudiante = document.getElementById("formulario-estudiante");
const cuadriculaRutas = document.getElementById("cuadricula-rutas");
const seleccionRuta = document.getElementById("seleccion-ruta");
const btnEliminarRuta = document.getElementById("btn-eliminar-ruta");

function guardarLocal() {
    localStorage.setItem("rutas", JSON.stringify(rutasGuardadas));
}

function renderizarRutas() {
    cuadriculaRutas.innerHTML = "";
    seleccionRuta.innerHTML = '<option value="" disabled selected>Elige una ruta activa...</option>';

    rutasGuardadas.forEach(ruta => {
        const tarjetaRuta = document.createElement("route-card");
        tarjetaRuta.setAttribute("id", ruta.id);
        tarjetaRuta.setAttribute("nombre", ruta.nombre);
        tarjetaRuta.setAttribute("conductor", ruta.conductor);
        tarjetaRuta.setAttribute("hora", ruta.hora);

        ruta.estudiantes.forEach(estudiante => {
            tarjetaRuta.agregarEstudiante(estudiante);
        });

        cuadriculaRutas.appendChild(tarjetaRuta);

        const opcion = document.createElement("option");
        opcion.value = ruta.id;
        opcion.textContent = ruta.nombre;
        seleccionRuta.appendChild(opcion);
    });
}

formularioRuta.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre-ruta").value.trim();
    const conductor = document.getElementById("nombre-conductor").value;
    const hora = document.getElementById("hora-salida").value;

    if (!nombre || !conductor || !hora) {
        alert("Por favor complete todos los campos de la ruta.");
        return;
    }

    const idRuta = "ruta-" + Date.now();
    const nuevaRuta = { id: idRuta, nombre, conductor, hora, estudiantes: [] };

    rutasGuardadas.push(nuevaRuta);
    guardarLocal();
    renderizarRutas();
    formularioRuta.reset();
});

formularioEstudiante.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreEstudiante = document.getElementById("nombre-estudiante").value.trim();
    const rutaDestinoId = seleccionRuta.value;

    if (!nombreEstudiante || !rutaDestinoId) {
        alert("Ingrese el nombre del estudiante y seleccione una ruta.");
        return;
    }

    const indice = rutasGuardadas.findIndex(ruta => ruta.id === rutaDestinoId);
    if (indice !== -1) {
        rutasGuardadas[indice].estudiantes.push(nombreEstudiante);
        guardarLocal();
        renderizarRutas();
    }

    formularioEstudiante.reset();
});

btnEliminarRuta.addEventListener("click", () => {
    if (rutasGuardadas.length > 0) {
        rutasGuardadas.pop();
        guardarLocal();
        renderizarRutas();
    } else {
        alert("No hay rutas para eliminar.");
    }
});

function inicializarAnimacionesJS() {
    const elementosAnimables = document.querySelectorAll(".insignia, .tarjeta-formulario");

    elementosAnimables.forEach(elemento => {
        elemento.addEventListener("mouseenter", () => {
            elemento.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
            elemento.style.transform = "translateY(-10px)";
        });

        elemento.addEventListener("mouseleave", () => {
            elemento.style.transform = "translateY(0)";
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let indiceActual = 0;
    seccionInicio.style.backgroundImage = imagenesFondo[indiceActual];

    const cambiarFondo = () => {
        indiceActual++;
        if (indiceActual >= imagenesFondo.length) {
            indiceActual = 0;
        }
        seccionInicio.style.backgroundImage = imagenesFondo[indiceActual];
    };
    setInterval(cambiarFondo, 6000);

    renderizarRutas();
    inicializarAnimacionesJS();
});