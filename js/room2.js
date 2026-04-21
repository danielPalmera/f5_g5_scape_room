
    /**
     * definición de variables
     */
    const contenedorCaras=document.getElementById("contenedorCaras")
    const title = document.getElementById("dungeon-name");
    let pausa=0;
    let seleccion=0;

    let face_1 = document.getElementById("face_1")
    let face_2 = document.getElementById("face_2")
    let face_3 = document.getElementById("face_3")

    let accion_1=document.getElementById("accion_1")
    let accion_2=document.getElementById("accion_2")
    let accion_3=document.getElementById("accion_3")

    let acciones = document.getElementById("acciones")
    let reacciones = document.getElementById("reacciones")
    const btn_pergamino =  document.getElementById("btn_pergamino")

    let mensaje_ = document.getElementById("mensaje")
    
    const bgGrito = new Audio("../assets/sound/grito_FuFa990.mp3");
    const risaGolpe = new Audio("../assets/sound/u_sb73n9hgyg-one-piece-luffy-laugh-sound-effect-332197.mp3");
    const roncando = new Audio("../assets/sound/roncando.mp3")
    const risa = new Audio("../assets/sound/universfield-sinister-laugh.mp3");
    const grito = new Audio("../assets/sound/universfield-epic-war-combat-scream-352707.mp3");
    const sonidoPuerta = new Audio("../assets/sound/dragon-studio-door-opening-454242.mp3");

    let llave=0;
    /**
     * Functiones
     */

    function iniciar(){
        bloquear()
        title.classList.replace("hide", "show");
        title.classList.add("animate-zoom"); 
        setTimeout(()=> {
        title.classList.replace("animate-zoom", "animate-zoom-out");
        title.classList.replace("show", "hide");
        desbloquear()
        }, 4000);
    }

    function bloquear(){
        contenedorCaras.classList.add("hide")
        acciones.classList.add("hide")
        reacciones.classList.add("hide")
        btn_pergamino.classList.add("hide")
    }

    function desbloquear(){
        contenedorCaras.classList.remove("hide")
        btn_pergamino.classList.remove("hide")
    }


    /**
     * Event Listener
     */
    function espera(cont){
        pausa = (cont==0) ? 0 : pausa+cont
    }

    function mostrar_mensaje(mensaje){
        reacciones.classList.remove("hide")
        mensaje_.innerText=mensaje
        setTimeout(()=> {
            reacciones.classList.add("hide")
        }, 3000)
    }
    function dejar_descansar(){
        setTimeout(()=> {
            mostrar_mensaje("se escucha a alguien decir déjenme descansar")
        }, 2000);
    }
    function mostrar_reacciones(accion){
        ocultar_acciones()
        if(seleccion==1){ //sueño
            if(accion==1){
                if(pausa<3){
                    espera(1)
                    mostrar_mensaje("Solo lo escuchas dormir")
                    roncando.currentTime = 0;
                    roncando.play().catch(error => {
                        console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
                    });
                }else{
                    reacciones.classList.remove("hide");
                    mensaje_.innerText = "Gracias por dejarme descansar, por eso te dejo pasar";

                    setTimeout(()=> {
                        sonidoPuerta.currentTime = 0;
                        sonidoPuerta.play().catch(error => {
                            console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
                        });
                        setTimeout(()=> {
                            window.location.href = "room3.html";
                        }, 2000);
                    }, 3000);
                }
            }else if(accion==2){
                espera(0)
                mostrar_mensaje("déjame descansar un poco más...")
            }else{
                espera(0)
                mostrar_mensaje("hey hey ¿qué te pasa? déjame dormir, estoy cansado")
            }
        }else if(seleccion==2){//reir
            if(accion==1){
                espera(1)
                mostrar_mensaje("no sucede nada, pero se escuchan los ronquidos de alguien")
                roncando.currentTime = 0;
                    roncando.play().catch(error => {
                        console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
                    });
            }else if(accion==2){
                espera(0)
                risa.currentTime = 0;
                risa.play().catch(error => {
                    console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
                });
                mostrar_mensaje("repite burlonamente lo que dices, y se ríe muy alto")
                dejar_descansar()
                
            }else{
                espera(0)
                
                risa.currentTime = 0;
                risa.play().catch(error => {
                    console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
                });
                mostrar_mensaje("hey hey ¿qué te pasa?, y se ríe muy alto")
                dejar_descansar()
            }
        }else{//gritar
            if(accion==1){
                espera(1)
                mostrar_mensaje("no sucede nada, pero se escuchan los ronquidos de alguien")
                roncando.currentTime = 0;
                roncando.play().catch(error => {
                    console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
                });
            }else if(accion==2){
                espera(0)
                
                grito.currentTime = 0;
                grito.play().catch(error => {
                    console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
                });
                setTimeout(()=> {
                    mostrar_mensaje("comienza a gritar muy alto, solo malas palabras")
                }, 1000);
                
                dejar_descansar()
            }else{
                espera(0)

                bgGrito.currentTime = 0;
                bgGrito.play().catch(error => {
                    console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
                });
                mostrar_mensaje("Grita muy fuerte de miedo")               
                dejar_descansar()
            }
        }
        quitar_seleccion()
        
    }
    function mostrar_acciones(){
        acciones.classList.remove("hide")
    }
    function ocultar_acciones(){
        acciones.classList.add("hide")
    }

    function quitar_seleccion(){
        face_1.classList.remove("seleccion")
        face_2.classList.remove("seleccion")
        face_3.classList.remove("seleccion")
    }

    face_1.addEventListener("click",()=>{
        quitar_seleccion()
        seleccion=1
        mostrar_acciones()
        face_1.classList.add("seleccion")
    })

    face_2.addEventListener("click",()=>{
        quitar_seleccion()
        seleccion=2
        mostrar_acciones()
        face_2.classList.add("seleccion")
        
    })

    face_3.addEventListener("click",()=>{
        quitar_seleccion()
        seleccion=3
        mostrar_acciones()
        face_3.classList.add("seleccion")
    })

    accion_1.addEventListener("click",()=>{
        mostrar_reacciones(1)
    })

    accion_2.addEventListener("click",()=>{
        mostrar_reacciones(2)
    })

    accion_3.addEventListener("click",()=>{
        mostrar_reacciones(3)
    })

    btn_pergamino.addEventListener("click",()=>{
        mostrar_mensaje("Quien no sabe soltar la carga en la almohada")
        setTimeout(()=> {
            mostrar_mensaje("No encontrará la llave en la alborada.")
        },3000);
        
    })
/**
 *  iniciar 
 */
    iniciar()
