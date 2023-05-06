const flex = document.getElementById("flex");
let cartasSeleccionadas = []; 
let contadorGanados = 0;
const resultado = document.getElementById("resultado"); 

let primerSonido = document.getElementById('sonido1');
let segundoSonido = document.getElementById('sonido2');
let tercerSonido = document.getElementById('sonido3');

const REINICIO = document.getElementById('reinicio');
let element = document.getElementById('cronometro');
let timer;

document.addEventListener("DOMContentLoaded", () => {
    armarTablero();
  });

let tarjetas = [
    {
      nombre: "Primer Gato",
      imagen:
        "images/gato1.jpg"
    },
    {
      nombre: "Segundo Gato",
      imagen:
        "images/gato2.jpg"
    },
    {
      nombre: "Tercer Gato",
      imagen:
        "images/gato3.jpg"
    },
    {
      nombre: "Cuarto Gato",
      imagen:
        "images/gato4.jpg"
    },
    {
      nombre: "Quinto Gato",
      imagen:
        "images/gato5.jpg"
    },
    {
      nombre: "Sexto Gato",
      imagen:
        "images/gato6.jpg"
    }
  ];

  tarjetas = tarjetas.concat(tarjetas); 

  REINICIO.addEventListener('click', reiniciar);

  function reiniciar(){
    //let timer= null;
    clearTimeout(timer);
    cartasSeleccionadas = [];
    contadorGanados = 0;
    flex.innerHTML= "";  
    element.innerHTML = "";
    resultado.textContent = (contadorGanados / 2) + " michis encontrados";
    tarjetas = revolverTarjetas(tarjetas)
    armarTablero();
  }

function revolverTarjetas(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];  
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  tarjetas = revolverTarjetas(tarjetas);
  
function armarTablero() {
    cronometroSegundos();
    const SPAN = document.createElement('span');

    for (let i = 0; i < tarjetas.length; i++) {
        const tarjeta = document.createElement("img");
        tarjeta.setAttribute("src", "images/caja.jpg");
    
        tarjeta.setAttribute("data-index", i);

        tarjeta.classList.add("imagen");

        tarjeta.setAttribute("name", tarjetas[i].nombre);

        tarjeta.addEventListener("click", voltearTarjeta);
      
        flex.appendChild(tarjeta);
    }
  }


function voltearTarjeta() {
    let index = this.getAttribute("data-index");

    cartasSeleccionadas.push(index);

    this.setAttribute("src", tarjetas[index].imagen);

    if (cartasSeleccionadas.length === 2) {
        setTimeout(validarTarjetasSeleccionadas, 500);
    }
  }

  function validarTarjetasSeleccionadas() {
    
    const listaTarjetas = document.querySelectorAll("img");
    const primeraTarjetaSeleccionadaIndex = cartasSeleccionadas[0];
    const segundaTarjetaSeleccionadaIndex = cartasSeleccionadas[1];

    if (primeraTarjetaSeleccionadaIndex == segundaTarjetaSeleccionadaIndex) {
        alert("¡Es la misma tarjeta!");
        listaTarjetas[primeraTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.jpg"
        );
        listaTarjetas[segundaTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.jpg"
        );
    }

         else if (listaTarjetas[primeraTarjetaSeleccionadaIndex].name === listaTarjetas[segundaTarjetaSeleccionadaIndex].name) {
        primerSonido.play();
        listaTarjetas[primeraTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.jpg"
        );
        listaTarjetas[segundaTarjetaSeleccionadaIndex].setAttribute(
        "src",
        "images/pattern.jpg"
        );
        listaTarjetas[primeraTarjetaSeleccionadaIndex].removeEventListener("click", voltearTarjeta);
        listaTarjetas[segundaTarjetaSeleccionadaIndex].removeEventListener("click", voltearTarjeta);
        contadorGanados = contadorGanados + 2;
    } else {
        segundoSonido.play();
        listaTarjetas[primeraTarjetaSeleccionadaIndex].setAttribute(
        "src","images/caja.jpg");
        listaTarjetas[segundaTarjetaSeleccionadaIndex].setAttribute(
        "src","images/caja.jpg");  
    }

    cartasSeleccionadas = [];
    if (contadorGanados === tarjetas.length) {
        resultado.textContent = "¡Felicidades! ¡Los encontraste a todos!";
        tercerSonido.play();
        clearTimeout(timer)
    } else {
        resultado.textContent = (contadorGanados / 2) + " razas encontradas"; 
    }
  }

  function cronometroSegundos(){ 
      let sec = 0;
      timer = setInterval(()=>{
          element.innerHTML= 'Tiempo: ' + sec + ' segundos';
          sec++;
      }, 1000);
    }
