/**
 * Animación de entrada
 */
const title = document.getElementById("dungeon-name");

title.classList.replace("hide", "show");
title.classList.add("animate-zoom");

setTimeout(() => {
  title.classList.replace("animate-zoom", "animate-zoom-out");

  setTimeout(() => {
    title.classList.replace("show", "hide");

    setTimeout(() => {
      const container = document.getElementById("message-container");
      container.classList.replace("hide", "show");
      container.classList.add("animate-zoom");
    }, 1000);

  }, 2000);

}, 4000);


/**
 * Mostrar / ocultar mensajes
 */
function hideShowMessage(id) {
  if (id === "paso1") {
    document.getElementById("message-1").classList.add("hide");
    document.getElementById("message-2").classList.replace("hide", "show");
    document.getElementById("message-2").classList.add("animate-zoom");

  } else if (id === "paso2") {
    document.getElementById("message-2").classList.replace("show", "hide");
    document.getElementById("message-3").classList.replace("hide", "show");
    document.getElementById("message-3").classList.add("animate-zoom");
  }
}


/**
 * Event listeners
 */
document.getElementById("btn_1").addEventListener("click", () => {
  hideShowMessage("paso1");
});

/**
 * Volumen del audio
 */
document.getElementById("bg-audio").volume = 0.1;
