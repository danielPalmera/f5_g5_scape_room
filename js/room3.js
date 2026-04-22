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

const golemGrowl = new Audio("../assets/sound/golemGrowl.mp3");




/**
 * ACERTIJO (todo el texto se maneja aquí)
 */
let intentos = 3;

const acertijos = [
  {
    pregunta: "Tengo ciudades, pero no casas. Tengo montañas, pero no árboles. Tengo agua, pero no peces. ¿Qué soy?",
    opciones: ["Un mapa", "Un espejo", "Un sueño"]
  },
  {
    pregunta: "Siempre estoy en camino, pero nunca llego. Todos me consultan, pero nadie me detiene. ¿Qué soy?",
    opciones: ["El futuro", "El reloj", "El viento"]
  },
  {
    pregunta: "Cuanto más largo es, más corto se vuelve. Te acompaña al nacer y te deja al morir. ¿Qué soy?",
    opciones: ["El nombre", "El camino", "El aliento"]
  },
  {
    pregunta: "Vuelo sin alas, lloro sin ojos. A donde voy, la oscuridad me sigue. ¿Qué soy?",
    opciones: ["La nube", "El humo", "El pensamiento"]
  },
  {
    pregunta: "Me rompo si me nombras, existo si callas. Soy el tesoro de los sabios. ¿Qué soy?",
    opciones: ["El silencio", "El cristal", "Un secreto"]
  },
  {
    pregunta: "Tengo llaves pero no cerraduras, tengo espacio pero no habitaciones. Puedes entrar, pero nunca salir caminando. ¿Qué soy?",
    opciones: ["Un teclado", "Un piano", "Un libro"]
  },
  {
    pregunta: "Soy más ligero que una pluma, pero ni el hombre más fuerte del mundo puede sostenerme por mucho tiempo. ¿Qué soy?",
    opciones: ["El aliento", "La burbuja", "El rayo de sol"]
  },
  {
    pregunta: "Corro pero no tengo pies, rujo pero no tengo boca. Si me detengo, muero. ¿Qué soy?",
    opciones: ["El río", "El fuego", "La cascada"]
  },
  {
    pregunta: "Tengo un ojo pero no puedo ver, soy delgada y pincho a quien me toca sin querer. ¿Qué soy?",
    opciones: ["La aguja", "La cerradura", "La tormenta"]
  },
  {
    pregunta: "Aunque tengo dientes, nunca muerdo. Ayudo a ordenar lo que el viento desordenó. ¿Qué soy?",
    opciones: ["El peine", "La sierra", "El engranaje"]
  }
];

// Conjunto de índices ya usados para no repetir acertijo
const indicesUsados = new Set();

function acertijoAleatorio() {
  let disponibles = acertijos.map((_, i) => i).filter(i => !indicesUsados.has(i));
  if (disponibles.length === 0) {
    indicesUsados.clear();
    disponibles = acertijos.map((_, i) => i);
  }
  const idx = disponibles[Math.floor(Math.random() * disponibles.length)];
  indicesUsados.add(idx);
  return acertijos[idx];
}

let acertijo = acertijoAleatorio();

// En cada acertijo, la respuesta correcta es siempre la primera opción (índice 0)
const indiceCorrecto = 0;

/**
 * FUNCIONES
 */

function bloquear() {
  contenedorCaras.classList.add("hide");
  acciones.classList.add("hide");
  reacciones.classList.add("hide");
}

function mostrarMensaje(texto) {
  reacciones.classList.remove("hide");
  mensaje_.innerText = texto;

  setTimeout(() => {
    reacciones.classList.add("hide");
  }, 4000);
}

function actualizarIntentos() {
  //intentosText.innerText = `Intentos: ${intentos}`;
}

function iniciar() {
  bloquear();
  contenedorCaras.style.justifyContent = 'center';
  
  face_1.hidden=true;
  // 1. Mostrar solo el título

  title.classList.replace("hide", "show");
  title.classList.add("animate-zoom");
  // 2. Ocultar título después de 3s
  setTimeout(() => {
    title.classList.replace("show", "hide");

    // 3. Mostrar gólem + pergamino
    setTimeout(() => {
      contenedorCaras.style.justifyContent = 'flex-end';
      face_1.hidden=false;
      //contenedorCaras.classList.remove("hide");
      face_1.classList.add("animate-golem");

        golemGrowl.currentTime = 0;
        golemGrowl.play().catch(error => {
            console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
        });

    }, 800);

  }, 3000);
}

/**
 * MOSTRAR OPCIONES AL PULSAR EL GOLEM
 * Aquí es donde usamos los 3 botones como "huecos" para las opciones
 */
face_1.addEventListener("click", () => {
  // El gólem desaparece
  contenedorCaras.classList.add("hide");
    mostrarMensaje(`Escucha: ${acertijo.pregunta}`);
    accion_1.textContent = acertijo.opciones[0];
    accion_2.textContent = acertijo.opciones[1];
    accion_3.textContent = acertijo.opciones[2];
    setTimeout(() => {
      acciones.classList.remove("hide");    
    }, 2000);
  // Rellenamos el texto de las opciones desde el acertijo seleccionado
  // Mostramos los botones
  
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
    mostrarMensaje(`Incorrecto, ¿intentamos otro acertijo?.`);
      setTimeout(() => {
        acertijo = acertijoAleatorio();
        acciones.classList.add("hide");
        contenedorCaras.classList.remove("hide");
    }, 2000);
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
