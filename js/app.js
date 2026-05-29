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
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        font-family: system-ui, sans-serif;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .tarjeta-ruta h3 {
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
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .btn-eliminar-estudiante {
        background-color: transparent;
        color: #FF3B56;
        border: 1px solid #FF3B56;
        border-radius: 4px;
        padding: 2px 6px;
        font-size: 10px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .btn-eliminar-estudiante:hover {
        background-color: rgba(255, 59, 86, 0.2);
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

    agregarEstudiante(nombreEstudiante, idRuta) {
        const lista = this.shadowRoot.getElementById("t-estudiantes");
        const li = document.createElement("li");

        const spanNombre = document.createElement("span");
        spanNombre.textContent = nombreEstudiante;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.className = "btn-eliminar-estudiante";

        btnEliminar.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("eliminar-estudiante", {
                detail: { nombre: nombreEstudiante, rutaId: idRuta },
                bubbles: true,
                composed: true
            }));
        });

        li.appendChild(spanNombre);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
        
    }
}

customElements.define("route-card", RouteCard);

const formularioRuta = document.getElementById("formulario-ruta");
const formularioEstudiante = document.getElementById("formulario-estudiante");
const cuadriculaRutas = document.getElementById("cuadricula-rutas");
const seleccionRuta = document.getElementById("seleccion-ruta");
const seleccionEstudiantes = document.getElementById("renderizar-ruta");
const btnEliminarRuta = document.getElementById("btn-eliminar-ruta");

function guardarLocal() {
    localStorage.setItem("rutas", JSON.stringify(rutasGuardadas));
}

function renderizarRutas() {
    cuadriculaRutas.innerHTML = "";
    seleccionRuta.innerHTML = '<option value="" disabled selected> Elige una ruta activa...</option>';

    rutasGuardadas.forEach(ruta => {
        const tarjetaRuta = document.createElement("route-card");
        tarjetaRuta.setAttribute("id", ruta.id);
        tarjetaRuta.setAttribute("nombre", ruta.nombre);
        tarjetaRuta.setAttribute("conductor", ruta.conductor);
        tarjetaRuta.setAttribute("hora", ruta.hora);

        ruta.estudiantes.forEach(estudiante => {
            tarjetaRuta.agregarEstudiante(estudiante, ruta.id);
        });

        cuadriculaRutas.appendChild(tarjetaRuta);

        const opcion = document.createElement("option");
        opcion.value = ruta.id;
        opcion.textContent = ruta.nombre;
        seleccionRuta.appendChild(opcion);
    });
}

function renderizarEstudiantes() {
    cuadriculaRutas.innerHTML = "";
    seleccionEstudiantes.innerHTML = '<option value="" disabled selected> Elige una ruta activa...</option>';

    rutasGuardadas.forEach(ruta => {
        const tarjetaRuta = document.createElement("route-card");
        tarjetaRuta.setAttribute("id", ruta.id);
        tarjetaRuta.setAttribute("nombre", ruta.nombre);
        tarjetaRuta.setAttribute("conductor", ruta.conductor);
        tarjetaRuta.setAttribute("hora", ruta.hora);

        ruta.estudiantes.forEach(estudiante => {
            tarjetaRuta.agregarEstudiante(estudiante, ruta.id);
        });

        cuadriculaRutas.appendChild(tarjetaRuta);

        const opcion = document.createElement("option");
        opcion.value = ruta.id;
        opcion.textContent = ruta.nombre;
        seleccionEstudiantes.appendChild(opcion);
    });
}

document.addEventListener("eliminar-estudiante", (e) => {
    const { nombre, rutaId } = e.detail;
    const indiceRuta = rutasGuardadas.findIndex(r => r.id === rutaId);

    if (indiceRuta !== -1) {
        rutasGuardadas[indiceRuta].estudiantes = rutasGuardadas[indiceRuta].estudiantes.filter(est => est !== nombre);
        guardarLocal();
        renderizarRutas();
    }
});

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

    let estudianteExiste = false;
    rutasGuardadas.forEach(ruta => {
        if (ruta.estudiantes.map(est => est.toLowerCase()).includes(nombreEstudiante.toLowerCase())) {
            estudianteExiste = true;
        }
    });

    if (estudianteExiste) {
        alert(`El estudiante "${nombreEstudiante}" ya se encuentra asignado a una ruta.`);
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

const personajesEasterEgg = [
    {
        imagen: "/assets/img/Sam - Yes Edition.webp",
        sonido: "/assets/snd/Yes-steps.mp3",
        ancho: "180px",
        alto: "auto"
    },
    {
        imagen: "/assets/img/thesaac.gif",
        sonido: "/assets/snd/specialist-dance.mp3",
        ancho: "120px",
        alto: "auto"
    },
    {
        imagen: "/assets/img/titocalderon.gif",
        sonido: "/assets/snd/momo.mp3",
        ancho: "180px",
        alto: "180px"
    },
    {
        imagen: "/assets/img/bigmanting.webp",
        sonido: "/assets/snd/robloxahh.mp3",
        ancho: "1050px",
        alto: "1000px"
    },
    {
        imagen: "/assets/img/combi.jpg",
        sonido: "/assets/snd/hill-climb.mp3",
        ancho: "300px",
        alto: "120px"
    },
    {
        imagen: "/assets/img/Sam.webp",
        sonido: "/assets/snd/YouAreNothing.mp3",
        ancho: "180px",
        alto: "auto"
    },
    {
        imagen: "/assets/img/Cinco_Deluxe_Walking.webp",
        sonido: "/assets/snd/CincoDeluxeTheme.mp3",
        ancho: "120px",
        alto: "auto"
    },
    {
        imagen: "/assets/img/CincoSamDeluxeWalk.webp",
        sonido: "/assets/snd/Cincosamdeluxe.mp3",
        ancho: "180px",
        alto: "auto"
    },
    {
        imagen: "/assets/img/He_Do_Be_Walkin.webp",
        sonido: "/assets/snd/Static.mp3",
        ancho: "120px",
        alto: "auto"
    },
    {
        imagen: "/assets/img/Crustification.webp",
        sonido: "/assets/snd/robloxahh.mp3",
        ancho: "120px",
        alto: "auto"
    },
    {
        imagen: "/assets/img/Mal.webp",
        sonido: "/assets/snd/MALBEAR.mp3",
        ancho: "120px",
        alto: "auto"
    },
    {
        imagen: "/assets/img/homero.gif",
        sonido: "/assets/snd/homero.mp3",
        ancho: "180px",
        alto: "180px"
    },
    {
        imagen: "/assets/img/impreza.gif",
        sonido: "/assets/snd/supa.mp3",
        ancho: "500px",
        alto: "120px"
    }
];

document.body.style.overflowX = "hidden";
seccionInicio.style.overflow = "visible";

function invocarPersonaje() {
    const indiceAleatorio = Math.floor(Math.random() * personajesEasterEgg.length);
    const personajeElegido = personajesEasterEgg[indiceAleatorio];

    const audioPasos = new Audio(personajeElegido.sonido);
    audioPasos.play();

    const imgPersonaje = document.createElement("img");
    imgPersonaje.src = personajeElegido.imagen;
    imgPersonaje.style.position = "absolute";

    imgPersonaje.style.width = personajeElegido.ancho;
    imgPersonaje.style.height = personajeElegido.alto;

    imgPersonaje.style.bottom = "-5px";
    imgPersonaje.style.left = "-250px";
    imgPersonaje.style.zIndex = "100";
    imgPersonaje.style.pointerEvents = "none";

    seccionInicio.appendChild(imgPersonaje);

    const duracion = 4000;
    const posicionInicial = -250;
    const posicionFinal = window.innerWidth;
    const distanciaTotal = posicionFinal - posicionInicial;

    let tiempoInicio = null;

    function moverFrame(tiempoActual) {
        if (!tiempoInicio) tiempoInicio = tiempoActual;
        const tiempoTranscurrido = tiempoActual - tiempoInicio;
        let progreso = tiempoTranscurrido / duracion;

        if (progreso > 1) progreso = 1;

        const posicionActualX = posicionInicial + (distanciaTotal * progreso);
        imgPersonaje.style.left = posicionActualX + "px";

        if (progreso < 1) {
            requestAnimationFrame(moverFrame);
        } else {
            audioPasos.pause();
            imgPersonaje.remove();
        }
    }

    requestAnimationFrame(moverFrame);
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

    const botonEspecial = document.querySelector('img[alt="Especial"]');
    if (botonEspecial && botonEspecial.parentElement) {
        botonEspecial.parentElement.addEventListener("click", (e) => {
            e.preventDefault();
            invocarPersonaje();
        });
    }
});