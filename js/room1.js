
    /**
     * definicion de variables
     */

    let encendido=true
    const body=document.getElementById("body")
    const onOff=document.getElementById("btn_encender")
    const craneo = document.getElementById("btn_craneo")
    const ayuda = document.getElementById("ayuda")
    const nollave=document.getElementById("nollave")
    const sillave=document.getElementById("sillave")
    const bodyt = document.body;
    const btn_key1 = document.getElementById("btn_key1")
    const btn_key2 = document.getElementById("btn_key2")
    const btn_key3 = document.getElementById("btn_key3")
    const cerradura = document.getElementById("cerradura")
    const title = document.getElementById("dungeon-name");

    const sonidoPuerta = new Audio("../assets/sound/dragon-studio-door-opening-454242.mp3");

    let llave=0;
    /**
     * Functiones
     */

    function iniciar(){
        bloquear()
        onOff.hidden=true
        title.classList.replace("hide", "show");
        title.classList.add("animate-zoom"); 
        setTimeout(()=> {
        title.classList.replace("animate-zoom", "animate-zoom-out");
        title.classList.replace("show", "hide");
        document.getElementById("room1").style.height="80vh"
        desbloquear()
        onOff.hidden=false
        }, 4000);
    }

    function bloquear(){
        [craneo, btn_key1, btn_key2, btn_key3].forEach(el => el.hidden = true);
        
    }

    function desbloquear(){
        [craneo, btn_key1, btn_key2, btn_key3].forEach(el => el.hidden = false);
        if(llave !== 0) document.getElementById("btn_key" + llave).hidden = true;
    }

    function cerraduraClick(){
        if(llave!==2){
        nollave.classList.replace("hide","show")
        setTimeout(()=> {
            nollave.classList.replace("show","hide")
        },2000);
        }else{
        sillave.classList.replace("hide","show")
        sonidoPuerta.currentTime = 0; 
    
        // Reproducimos
        sonidoPuerta.play().catch(error => {
            console.error("El navegador bloqueó el audio. ¡Haz clic en la página primero!", error);
        });
        setTimeout(()=> {
            sillave.classList.replace("show","hide")
            window.location.href = "room2.html"; 
        },2000);
        
        }
    }

    function lightOff(){
        body.classList.replace("light","dark")
        document.getElementById("imgOnOff").classList.replace("cristalOn","cristalOff")
        bloquear()
        cerradura.addEventListener("click", cerraduraClick)
    }

    function lightOn(){
        body.classList.replace("dark","light")
        document.getElementById("imgOnOff").classList.replace("cristalOff","cristalOn")
        desbloquear()
        cerradura.removeEventListener("click", cerraduraClick)
    }

    function restablecerCursores(){
        bodyt.classList.remove("cursor-key1", "cursor-key2", "cursor-key3");      
    }

    /**
     * Event Listener
     */
    onOff.addEventListener("click", () => {
        encendido ? lightOff() : lightOn();
        encendido = !encendido;
    })

    craneo.addEventListener("click",()=>{
        craneo.disabled = true;
        ayuda.classList.replace("hide","show")
        document.getElementById("imgOnOff").hidden=true;
        bloquear()
        setTimeout(()=> {
        document.getElementById("imgOnOff").hidden=false;
        desbloquear()
        ayuda.classList.replace("show","hide")
        craneo.disabled = false;
        },5000);
    });

    [btn_key1, btn_key2, btn_key3].forEach((btn, i) => {
        const num = i + 1;
        btn.addEventListener("click", () => {
            restablecerCursores();
            llave = num;
            bodyt.classList.add("cursor-key" + num);
            btn_key1.hidden = (num === 1);
            btn_key2.hidden = (num === 2);
            btn_key3.hidden = (num === 3);
        })
    })

/**
 *  iniciar 
 */
    iniciar()
    document.getElementById('bg-audio').volume = 0.1;