# Sistema de Monitoreo - Rutas Seguras Kids 🚌🎒

Tecnologías y Lenguajes: HTML5, CSS3 y JavaScript Vanilla (Web Components) 🚀🔥

## Descripción: 😉

El proyecto consiste en gestionar un sistema inteligente para el monitoreo y organización de rutas escolares en tiempo real. La aplicación web permite registrar trayectos con conductores asignados de forma dinámica, asociar alumnos a rutas específicas, y visualizar el estado del clima local mediante integraciones con APIs externas. Todo esto bajo una interfaz interactiva y moderna con diseño responsivo.

## ¿Qué soluciona? 🤨

Esta aplicación ayuda a las instituciones educativas y empresas de transporte escolar que presentan inconvenientes o demoras en la organización diaria de sus trayectos. Ofrece una solución centralizada y ágil para mitigar la falta de control sobre los alumnos asignados, permitiendo verificar los horarios de salida y optimizar la comunicación logística de manera inmediata.

## Funcionamiento y estructura: 😃

El proyecto se divide de forma modular en archivos HTML, CSS y scripts de JavaScript independientes, garantizando que cada componente maneje una funcionalidad específica del sistema de manera limpia:

### index.html:

Contiene el maquetado estructural de la aplicación. Se organiza mediante secciones semánticas bien definidas:

-   ****Inicio:**** Presenta un banner interactivo con carrusel de imágenes de fondo y el widget meteorológico.
-   ****Sobre Nosotros:**** Sección corporativa que expone las insignias de confianza de la empresa.
-   ****Administración:**** Panel de control con diseño __glassmorphism__ que alberga los formularios interactivos de registro.
-   ****Monitoreo:**** El espacio donde se renderizan las tarjetas dinámicas de las rutas activas.

### style.css:

Define la identidad visual del sitio implementando una paleta de colores corporativa (azul oscuro, verde brillante y acentos de alerta). Incluye:

-   Efectos avanzados de transparencia y desenfoque (__backdrop-filter__) para simular el estilo semitransparente del widget del clima en los formularios.
-   Transiciones fluidas en botones, enlaces y menús desplegables.
-   Soporte adaptativo (__Media Queries__ optimizados a ****768px****) para garantizar una experiencia óptima en teléfonos móviles y tabletas.

### /js/app.js:

Es el núcleo de la lógica interactiva del frontend. Se encarga de las siguientes tareas clave:

1.  ****Persistencia de Datos (LocalStorage):**** Implementa funciones de almacenamiento seguro para guardar las rutas creadas y los estudiantes inscritos de forma permanente, evitando la pérdida de información al salir de la página o recargar el navegador.
2.  ****Web Components y Shadow DOM:**** Define la etiqueta personalizada `<route-card>` que encapsula los estilos y la estructura de las tarjetas de monitoreo de forma aislada e independiente.
3.  ****Gestión Dinámica de Rutas:**** Controla el procesamiento de los formularios, la vinculación de alumnos dentro de los objetos de rutas y añade un botón especializado para eliminar la última ruta agregada del arreglo y del DOM.
4.  ****Animaciones Nativas:**** Añade eventos de escucha (`mouseenter` y `mouseleave`) mediante JavaScript para animar sutilmente las tarjetas de formularios y las insignias de "Sobre Nosotros", elevándolas verticalmente al posicionar el cursor sobre ellas.
5.  ****Menú Hamburguesa e Interacciones:**** Controla el despliegue del menú móvil, gestiona eventos interactivos con el logotipo y habilita sorpresas ocultas en la interfaz (detallado más abajo).

### /js/api-conductores.js:

Maneja la comunicación asíncrona mediante el uso de `fetch` y bloques `try/catch`. Consulta un servicio externo de usuarios simulados (`jsonplaceholder`) para alimentar el selector de conductores asignados en tiempo real dentro del formulario de creación de rutas.

### /js/api-clima.js:

Se conecta con la API externa de OpenWeather utilizando credenciales de acceso dinámicas. Extrae información meteorológica en tiempo Real (temperatura en grados Celsius, descripción atmosférica e íconos oficiales) adaptados específicamente para la ciudad de Bucaramanga.

### 🥚 El Toque Secreto (Easter Egg):

¡No todo es logística y organización seria! Al final de la página, camuflado de forma sutil junto a los enlaces de redes sociales (YouTube, TikTok e Instagram) en el footer, se esconde un botón "Especial". Al hacer clic en este ícono, se ejecuta la función `invocarPersonaje()` que desata un poco de caos divertido:

-   ****Selección Dinámica:**** El script elige al azar un personaje de un catálogo de 13 referencias de Bear Alpha y Cosos Epicos. xd
-   ****Multimedia Sincronizada:**** Al instanciarse, se reproduce un efecto de sonido (`new Audio()`) único que acompaña al personaje elegido.
-   ****Animación de Alto Rendimiento:**** Crea un elemento de imagen dinámico en el DOM y lo anima cruzando toda la pantalla de izquierda a derecha. Utiliza `requestAnimationFrame` para calcular el progreso del tiempo y la distancia, garantizando un movimiento 100% fluido y sin tirones. ¡Una vez el personaje termina su recorrido, la música se pausa y el nodo se elimina del DOM automáticamente!  
    Una pequeña recompensa para los usuarios más curiosos que exploran hasta el último píxel del sitio. 👀✨

## Estructura del Almacenamiento Local (LocalStorage): 💾

Los datos persistidos se guardan bajo la clave `"rutas"` en formato de cadena JSON. Al transformarse en un arreglo de objetos, mantiene una estructura jerárquica similar a la siguiente tabla lógica:

| ID de Ruta         | Nombre de Ruta          | Conductor Asignado | Hora de Salida | Estudiantes Asignados (Lista)          |
| ------------------ | ----------------------- | ------------------ | -------------- | -------------------------------------- |
| ruta-1716304800000 | Ruta Norte - Primaria   | Leanne Graham      | 06:30          | ["Juan Toscano Duarte", "Kevin Arpom"] |
| ruta-1716304950000 | Ruta Sur - Bachillerato | Ervin Howell       | 12:45          | ["Estudiante Ejemplo"]                 |

## Información de contacto: 🧑🏻‍🦱💫✨

****Autor:****

Resbaloso ( ͡° ͜ʖ ͡°)

****Contacto:****

juansetoscano@gmail.com

░░░░░░░░░░░░░░░░░░░░░░█████████░░░░░░░░░
░░███████░░░░░░░░░░███▒▒▒▒▒▒▒▒███░░░░░░░
░░█▒▒▒▒▒▒█░░░░░░░███▒▒▒▒▒▒▒▒▒▒▒▒▒███░░░░
░░░█▒▒▒▒▒▒█░░░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░
░░░░█▒▒▒▒▒█░░░██▒▒▒▒▒██▒▒▒▒▒▒██▒▒▒▒▒███░
░░░░░█▒▒▒█░░░█▒▒▒▒▒▒████▒▒▒▒████▒▒▒▒▒▒██
░░░█████████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
░░░█▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒██
░██▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒██▒▒▒▒▒▒▒▒▒▒██▒▒▒▒██
██▒▒▒███████████▒▒▒▒▒██▒▒▒▒▒▒▒▒██▒▒▒▒▒██
█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒████████▒▒▒▒▒▒▒██
██▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░
░█▒▒▒███████████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░░
░██▒▒▒▒▒▒▒▒▒▒████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█░░░░░
░░████████████░░░█████████████████░░░░░░