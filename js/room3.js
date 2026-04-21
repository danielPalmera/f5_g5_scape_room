/**
 * VARIABLES
 */
const title = document.getElementById("dungeon-name");
const contenedorCaras = document.getElementById("contenedorCaras");
const face_1 = document.getElementById("face_1");

const acciones = document.getElementById("acciones");
const accion_1 = document.getElementById("accion_1");
const accion_2 = document.getElementById("accion_2");
const accion_3 = document.getElementById("accion_3");

const reacciones = document.getElementById("reacciones");
const mensaje_ = document.getElementById("mensaje");

const btn_pergamino = document.getElementById("btn_pergamino");
const intentosText = document.getElementById("intentos");

/**
 * ACERTIJO (todo el texto se maneja aquí)
 */
let intentos = 3;

const pregunta = "Me sigues sin saberlo, me encuentras sin buscarme… ¿qué soy?";
const opciones = [
  "La sombra",
  "El viento",
  "El eco"
];

// índice de la opción correcta (0, 1 o 2)
const indiceCorrecto = 0;

/**
 * FUNCIONES
 */

function bloquear() {
  contenedorCaras.classList.add("hide");
  acciones.classList.add("hide");
  reacciones.classList.add("hide");
  btn_pergamino.classList.add("hide");
  intentosText.classList.add("hide");
}

function mostrarMensaje(texto) {
  reacciones.classList.remove("hide");
  mensaje_.innerText = texto;

  setTimeout(() => {
    reacciones.classList.add("hide");
  }, 2500);
}

function actualizarIntentos() {
  intentosText.innerText = `Intentos: ${intentos}`;
}

function iniciar() {
  bloquear();

  // 1. Mostrar solo el título
  title.classList.replace("hide", "show");

  // 2. Ocultar título después de 3s
  setTimeout(() => {
    title.classList.replace("show", "hide");

    // 3. Mostrar gólem + pergamino
    setTimeout(() => {
      contenedorCaras.classList.remove("hide");
      face_1.classList.add("animate-golem");
      btn_pergamino.classList.remove("hide");
    }, 800);

  }, 3000);
}

/**
 * INSTRUCCIONES DEL ACERTIJO (pergamino)
 */
btn_pergamino.addEventListener("click", () => {
  mostrarMensaje(`Escucha: ${pregunta} Tienes 3 intentos.`);
  intentosText.classList.remove("hide");
  actualizarIntentos();
});

/**
 * MOSTRAR OPCIONES AL PULSAR EL GOLEM
 * Aquí es donde usamos los 3 botones como "huecos" para las opciones
 */
face_1.addEventListener("click", () => {
  // El gólem desaparece
  contenedorCaras.classList.add("hide");

  // Rellenamos el texto de las opciones desde el JS
  accion_1.textContent = opciones[0];
  accion_2.textContent = opciones[1];
  accion_3.textContent = opciones[2];

  // Mostramos los botones
  acciones.classList.remove("hide");
});

/**
 * EVALUAR RESPUESTA
 */
function evaluarRespuesta(indiceElegido) {
  if (indiceElegido === indiceCorrecto) {
    mostrarMensaje("Correcto. El gólem te deja pasar.");
    setTimeout(() => {
      window.location.href = "success.html";
    }, 2500);
  } else {
    intentos--;
    actualizarIntentos();

    if (intentos > 0) {
      mostrarMensaje(`Incorrecto. Te quedan ${intentos} intentos.`);
    } else {
      mostrarMensaje("Has fallado los 3 intentos.");
      setTimeout(() => {
        window.location.href = "failure.html";
      }, 2500);
    }
  }
}

/**
 * RESPUESTAS (los 3 botones ahora son las 3 opciones)
 */
accion_1.addEventListener("click", () => evaluarRespuesta(0));
accion_2.addEventListener("click", () => evaluarRespuesta(1));
accion_3.addEventListener("click", () => evaluarRespuesta(2));

/**
 * INICIAR ESCENA
 */
iniciar();
