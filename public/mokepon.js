const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')

const botonMascotaJugador = document.getElementById("boton-mascota")

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')


const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const resultadosIndividuales = document.getElementById('resultados-individuales')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const contenedorAtaquesEnemigos = document.getElementById('contenedorAtaquesEnemigos')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let actividadJugador = null
let actividadEnemigo = null

let jugadorId = null
let enemigoId = null

let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let botones = []
let botonesEnemigos =[]

let ataquesEscogidosEnemigo =[]
let ataqueAleatorio
// let ataqueJugador

let opcionDeMokepones
let opcionDeAtaques

let vidasJugador = 3
let vidasEnemigo = 3
let victoriasJugador = 0
let victoriasEnemigo = 0

let inputHipodoge
let inputCapipepo
let inputRatigueya

let botonFuego
let botonAgua
let botonTierra

let mascotaJugador
let mascotaJugadorObjeto

let ataques
let ataquesMokeponEnemigo

let indexAtaqueJugador;
let indexAtaqueEnemigo;

let numeroAtaquesJugador
let numeroAtaquesEnemigo

let lienzo = mapa.getContext("2d")

let intervalo

let mapaBackground = new Image()
mapaBackground.src ='./assets/mokemap.png'

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if( anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon{
    constructor(nombre, foto, vida, rango,fotoMapa, id=null){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.rango = rango
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, anchoDelMapa - this.ancho)  
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        this.id = id
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        ) 
    }
}

// Rango bajo
let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, 2,'./assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, 2,'./assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, 2,'./assets/ratigueya.png')
// Rango alto
let langostelvis = new Mokepon('Langostelvis','./assets/mokepons_mokepon_langostelvis_attack.png', 5, 1,'./assets/langostelvis.png' )
let pydos = new Mokepon('Pydos','./assets/mokepons_mokepon_pydos_attack.png', 5, 1,'./assets/pydos.png')
let tucapalma = new Mokepon('Tucapalma','./assets/mokepons_mokepon_tucapalma_attack.png', 5, 1,'./assets/tucapalma.png')


/* // Rango bajo
let hipodogeEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, 2,'./assets/hipodoge.png')
let capipepoEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, 2,'./assets/capipepo.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, 2,'./assets/ratigueya.png')
// Rango alto
let langostelvisEnemigo = new Mokepon('Langostelvis','./assets/mokepons_mokepon_langostelvis_attack.png', 5, 2,'./assets/langostelvis.png')
let pydosEnemigo = new Mokepon('Pydos','./assets/mokepons_mokepon_pydos_attack.png', 5, 1,'./assets/pydos.png')
let tucapalmaEnemigo = new Mokepon('Tucapalma','./assets/mokepons_mokepon_tucapalma_attack.png', 5, 1,'./assets/tucapalma.png')
 */

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'}
]

const CAPIPEPO_ATAQUES=[
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'}
]

const RATIGUEYA_ATAQUES=[
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'}
]

const LANGOSTELVIS_ATAQUES=[
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'}
]

const PYDOS_ATAQUES =[
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'}
]

const TUCAPALMA_ATAQUES = [
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'}
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
langostelvis.ataques.push(...LANGOSTELVIS_ATAQUES)
pydos.ataques.push(...PYDOS_ATAQUES)
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)

// hipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES)
// capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES)
// ratigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES)
// langostelvisEnemigo.ataques.push(...LANGOSTELVIS_ATAQUES)
// pydosEnemigo.ataques.push(...PYDOS_ATAQUES)
// tucapalmaEnemigo.ataques.push(...TUCAPALMA_ATAQUES)



mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class ="tarjeta-de-mokepon" for=${mokepon.nombre} >
           <p>${mokepon.nombre}</p> 
           <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `

        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo= document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
        inputLangostelvis = document.getElementById('Langostelvis')
        inputPydos = document.getElementById('Pydos')
        inputTucapalma = document.getElementById('Tucapalma')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse") // cambiar por tu ip
        .then(function(res){
            // console.log(res)
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){

    sectionSeleccionarMascota.style.display = 'none'
    
    let resultado = ""

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
        resultado = "Hipodoge"
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
        resultado = "Capipepo"
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
        resultado = "Ratigueya"
    }else if(inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
        resultado = "Langostelvis"
    }else if(inputPydos.checked){
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
        resultado = "Pydos"
    }else if(inputTucapalma.checked){
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
        resultado = "Tucapalma"
    }else{
        alert("Selecciona una Mascota") 
    }

    

    if(resultado != ""){
        extraerAtaques(mascotaJugador)
        seleccionarMokepon(mascotaJugador)
        // seleccionarMascotaEnemigo()
        // sectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'flex'
        iniciarMapa()
    }else{
        reiniciarJuego()
    }
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {// cambiar por tu ip
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){

    for (let i = 0; i < mokepones.length; i++) {     
        if (mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
            numeroAtaquesJugador = mokepones[i].ataques.length   
        }
    }

    mostrarAtaquesJugador(ataques)
}

function mostrarAtaquesJugador(ataques){

    ataques.forEach(ataque => {
        opcionDeAtaques =`
            <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += opcionDeAtaques
    });

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll('.BAtaque')

}
function mostrarAtaquesEnemigo(ataques){
    ataques.forEach(ataque => {
        opcionDeAtaques =`
            <button id=${ataque.id} class="boton-de-ataque AtaqueEnemigo">${ataque.nombre}</button>
        `
        contenedorAtaquesEnemigos.innerHTML += opcionDeAtaques
    });

    botonesEnemigos = document.querySelectorAll('.AtaqueEnemigo')
}

function secuenciaAtaque(){
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                boton.style.background = '#112f58'
            }else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f58'
            }else if(e.target.textContent === '🌱'){
                ataqueJugador.push('TIERRA')
                boton.style.background = '#112f58'
            } 
            boton.disabled = true
            
            // ataqueAleatorioEnemigo()
            actividadJugador = true

            enviarAtaques()
        })
    });
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`,{// cambiar por tu ip
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador,
            actividad: actividadJugador
        })
    })

    console.log(ataqueJugador)
    
    intervalo=setInterval(obtenerAtaques,50)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)// cambiar por tu ip
        .then(function (res){
            if(res.ok){
                res.json()
                    .then(function({ataques, actividad}){
                        ataqueEnemigo = ataques
                        actividadEnemigo = actividad

                        if(ataqueEnemigo.length === ataqueJugador.length && ataqueEnemigo.length !== 0 && ataqueJugador.length !== 0){
                            if(actividadEnemigo === true && actividadJugador === true){
                                actividadEnemigo = false
                                actividadJugador = false
                                iniciarPeleaIndividual()
                            }  
                        }
                    })
            }
        })
    
    console.log(ataqueEnemigo)
}

function seleccionarMascotaEnemigo(enemigo){
    // let mascotaAleatorio = aleatorio(0, mokepones.length - 1)  

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    
    ataquesMokeponEnemigo = enemigo.ataques

    numeroAtaquesEnemigo = enemigo.ataques.length

    mostrarAtaquesEnemigo(ataquesMokeponEnemigo)
    secuenciaAtaque()
}


function numeroUnico(numeroAtaques){
    ataqueAleatorio = aleatorio(0, numeroAtaques - 1) 

    if(ataquesEscogidosEnemigo.includes(ataqueAleatorio)){
        numeroUnico(numeroAtaques)
    }else{
        ataquesEscogidosEnemigo.push(ataqueAleatorio) 
    }

    return ataqueAleatorio
}

function ataqueAleatorioEnemigo(){
    
    ataqueAleatorio = numeroUnico(ataquesMokeponEnemigo.length) 
    if(ataquesMokeponEnemigo[ataqueAleatorio].nombre === '🔥'){
        ataqueEnemigo.push("FUEGO")
    }else if(ataquesMokeponEnemigo[ataqueAleatorio].nombre === '💧'){
        ataqueEnemigo.push("AGUA")
    }else{
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)

    selecccionBotonEnemigo(ataqueAleatorio)
    iniciarPeleaIndividual()
}

function selecccionBotonEnemigo(ataque){
    for (let index = 0; index < botonesEnemigos.length; index++) {
        if(index === ataque){
            botonesEnemigos[index].style.background = '#112f58'
            botonesEnemigos[index].disabled = true
        }      
    }
}

function iniciarPeleaIndividual(){
    let boton

    numeroAtaquesEnemigo--
    numeroAtaquesJugador--

    combate(ataqueJugador[ataqueJugador.length-1], ataqueEnemigo[ataqueEnemigo.length-1] )

    if (numeroAtaquesEnemigo === 0 || numeroAtaquesJugador === 0) {
        if(numeroAtaquesEnemigo > 0){
            victoriasEnemigo++
            boton = botonRestante(botonesEnemigos)    
            crearMensaje("-", boton, "PERDISTE 😢")
        }else if(numeroAtaquesJugador > 0){
            victoriasJugador++
            boton = botonRestante(botones)
            crearMensaje(boton,"-", "TRIUNFASTE 🎉")
        }

        spanVidasEnemigo.innerHTML = victoriasEnemigo
        spanVidasJugador.innerHTML = victoriasJugador

        deshabilitarBotones()
        revisarVidas()
    }
}

function botonRestante(botones){
    
    for (let index = 0; index < botones.length; index++) {
        if(botones[index].disabled === false){
            ataqueUltimo = botones[index].id
            ataqueUltimo = ataqueUltimo.substring(6,ataqueUltimo.length).toUpperCase()
            return ataqueUltimo
        }
    }
}

function deshabilitarBotones(){
    botones.forEach(boton => {
        boton.disabled = true
    })
}

function combate(ataqueJugador, ataqueEnemigo){
    let resultado = ""

    if (ataqueJugador == ataqueEnemigo){
        resultado = "EMPATASTE 😒"  
    }else if( ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA"){
        resultado = "TRIUNFASTE 🎉"
        victoriasJugador++
    }else if( ataqueJugador == "AGUA" && ataqueEnemigo =="FUEGO"){
        resultado = "TRIUNFASTE 🎉"
        victoriasJugador++
    }else if( ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
        resultado = "TRIUNFASTE 🎉"
        victoriasJugador++
    }else{
        resultado = "PERDISTE 😢"
        victoriasEnemigo++
    }

    spanVidasEnemigo.innerHTML = victoriasEnemigo
    spanVidasJugador.innerHTML = victoriasJugador
    
    crearMensaje(ataqueJugador, ataqueEnemigo, resultado)

}

function crearMensaje(ataqueJugador, ataqueEnemigo, resultado){
    // let notificacion = document.createElement('p')
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    let nuevoResultado = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador 
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo
    nuevoResultado.innerHTML = resultado
   
    
    // sectionMensajes.appendChild(notificacion)
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    resultadosIndividuales.appendChild(nuevoResultado)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo) 
    
}

function revisarVidas(){
    if (victoriasEnemigo ===  victoriasJugador){
        crearMensajeFinal("Esto fue un Empate 😠😠😠")
    }else if(victoriasEnemigo <  victoriasJugador){
        crearMensajeFinal("Felicitaciones ¡ Ganaste ! 🎉🎉🎉🎉")
    }else{
        crearMensajeFinal("Lo siento,  ¡ Perdiste ! 😢😢😢😢")
    }
}

function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML = resultadoFinal

    botonMascotaJugador.disabled = true
    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    
    mokeponesEnemigos.forEach(function(mokepon){
        if(mokepon != undefined){
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
    })

    // hipodogeEnemigo.pintarMokepon()
    // capipepoEnemigo.pintarMokepon()
    // ratigueyaEnemigo.pintarMokepon()
    // tucapalmaEnemigo.pintarMokepon()
    // langostelvisEnemigo.pintarMokepon()
    // pydosEnemigo.pintarMokepon()

    // if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
    //     revisarColision(hipodogeEnemigo)
    //     revisarColision(capipepoEnemigo)
    //     revisarColision(ratigueyaEnemigo)
    //     revisarColision(tucapalmaEnemigo)
    //     revisarColision(langostelvisEnemigo)
    //     revisarColision(pydosEnemigo)
    // }

}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{// cambiar por tu ip
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({enemigos}){
                        console.log(enemigos)
                        
                        mokeponesEnemigos = enemigos.map(function(enemigo){
                            let mokeponEnemigo = null
                            
                            if(enemigo.mokepon!= undefined){
                                const mokeponNombre = enemigo.mokepon.nombre
                                if(mokeponNombre === "Hipodoge"){
                                    mokeponEnemigo = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png', 5, 2,'./assets/hipodoge.png', enemigo.id)
                                    mokeponEnemigo.ataques.push(...HIPODOGE_ATAQUES)
                                }else if(mokeponNombre === "Capipepo"){
                                    mokeponEnemigo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5, 2,'./assets/capipepo.png', enemigo.id)
                                    mokeponEnemigo.ataques.push(...CAPIPEPO_ATAQUES)
                                }else if(mokeponNombre === "Ratigueya"){
                                    mokeponEnemigo = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, 2,'./assets/ratigueya.png', enemigo.id)
                                    mokeponEnemigo.ataques.push(...RATIGUEYA_ATAQUES)
                                }else if(mokeponNombre === "Langostelvis"){
                                    mokeponEnemigo = new Mokepon('Langostelvis','./assets/mokepons_mokepon_langostelvis_attack.png', 5, 1,'./assets/langostelvis.png', enemigo.id)
                                    mokeponEnemigo.ataques.push(...LANGOSTELVIS_ATAQUES)
                                }else if(mokeponNombre === "Pydos"){
                                    mokeponEnemigo = new Mokepon('Pydos','./assets/mokepons_mokepon_pydos_attack.png', 5, 1,'./assets/pydos.png', enemigo.id)
                                    mokeponEnemigo.ataques.push(...PYDOS_ATAQUES)
                                }else if(mokeponNombre === "Tucapalma"){
                                    mokeponEnemigo = new Mokepon('Tucapalma','./assets/mokepons_mokepon_tucapalma_attack.png', 5, 1,'./assets/tucapalma.png', enemigo.id)
                                    mokeponEnemigo.ataques.push(...TUCAPALMA_ATAQUES)
                                }
                                mokeponEnemigo.x = enemigo.x
                                mokeponEnemigo.y = enemigo.y
                                
                            }
                        
                            return mokeponEnemigo
                        })
                    })
            }
        })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        default:
            break;
    }
}
function iniciarMapa(){
    // mapa.width = 800
    // mapa.height = 600

    intervalo = setInterval(pintarCanvas, 50) 
    mascotaJugadorObjeto = obtenerObjetoMascota()
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)

}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {     
        if (mascotaJugador === mokepones[i].nombre){
            return mokepones[i] 
        }
    }
}


function revisarColision(enemigo){

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo  ||
        izquierdaMascota > derechaEnemigo 
    ){
        return
    }

    
    detenerMovimiento()
    clearInterval(intervalo)
    seleccionarMascotaEnemigo(enemigo)

    enemigoId = enemigo.id

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
}
window.addEventListener('load', iniciarJuego)

