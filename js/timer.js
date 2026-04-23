/**
 * TEMPORIZADOR COMPARTIDO
 * Persiste el tiempo restante en sessionStorage entre room1, room2 y room3.
 * Llama a window.prisa() al llegar a 20s y a window.fin() al llegar a 0s.
 */

const TIEMPO_INICIAL = 120;
const CLAVE_STORAGE = "tiempoRestante";
const BASE_FONT_SIZE = 32; // px (equivalente a ~1.4rem)

const timerDisplay = document.getElementById("timer-display");
const ticktack = new Audio("../assets/sound/clock.mp3");
const fondoMusical = new Audio("../assets/sound/dungeon_out.ogg");
ticktack.loop = true;
        fondoMusical.currentTime = 0
        fondoMusical.volume=.5
        // Reproducimos
        fondoMusical.play().catch(error => {
            console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
        });
// Recuperar tiempo de sessionStorage o iniciar desde 60
let tiempoRestante = parseInt(sessionStorage.getItem(CLAVE_STORAGE) ?? TIEMPO_INICIAL, 10);

let prisaLlamada = tiempoRestante <= 20; // no volver a llamar si ya pasó
let modeHurryUpLlamada = tiempoRestante <= 10;

function actualizarDisplay() {
  timerDisplay.textContent = tiempoRestante + "s";

  const porcentajeTranscurrido = (TIEMPO_INICIAL - tiempoRestante) / TIEMPO_INICIAL;
  timerDisplay.style.fontSize = (BASE_FONT_SIZE * (2     + porcentajeTranscurrido)) + "px";

  if (tiempoRestante <= 20) {
    timerDisplay.classList.add("timer-prisa");
  }
}
function modeHurryUp(){
  ticktack.playbackRate = 1.5;
}
function hurryUp(){
  ticktack.currentTime = 0;
  ticktack.play().catch(error => {
      console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
  });
    // el tamaño ya se gestiona dinámicamente en actualizarDisplay
}
function end(){
   window.location.href = "failure.html";
}

actualizarDisplay();

// Restaurar estado de audio si ya se cruzaron los umbrales en salas anteriores
if (tiempoRestante <= 20) {
  ticktack.play().catch(error => {
    console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
  });
}
if (tiempoRestante <= 10) {
  ticktack.playbackRate = 1.5;
}

const intervalo = setInterval(() => {
  tiempoRestante--;
  sessionStorage.setItem(CLAVE_STORAGE, tiempoRestante);
  actualizarDisplay();

  if (tiempoRestante <= 20 && !prisaLlamada) {
    prisaLlamada = true;
    hurryUp();
  }

  if (tiempoRestante <= 10 && !modeHurryUpLlamada) {
    modeHurryUpLlamada = true;
    if (typeof modeHurryUp === "function") modeHurryUp();
  }

  if (tiempoRestante <= 0) {
    clearInterval(intervalo);
    sessionStorage.removeItem(CLAVE_STORAGE);
    window.location.href = "failure.html";
  }
}, 1000);
