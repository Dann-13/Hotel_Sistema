// Obtener el botón y el div de la imagen
const boton = document.querySelector(".btn__registro");
//btnLogin
const btnLogin = document.querySelector(".btn__login");
const imagenFondo = document.querySelector(".imagen__fondo");
//formulario registro
const formRegistro = document.querySelector(".main-register");
//Seccion formulario login
const formLogin = document.querySelector(".main-login");
//Seccion pregunta si no tiene cuenta
const seccionRegistro = document.querySelector(".lado-login");
//seccion que pregunta si ya tiene una cuenta para mostrat formulario login
const seccionLogin = document.querySelector(".lado-registro");

// Agregar evento de clic al botón
boton.addEventListener("click", () => {
  // Agregar la clase para mover la imagen a la derecha
  imagenFondo.classList.add("imagen__fondo--derecha");
  // a su vez ocultamos form login
  formLogin.classList.add("main-login--oculto");
  // y la seccion en donde preguntamos si no tiene cuenta
  seccionRegistro.classList.remove("lado-login");
  seccionRegistro.classList.add("lado-login--oculto");
  // la seccion se mostrara para preguntarle si ya tiene una cuenta ps
  seccionLogin.classList.remove("lado-registro");
  seccionLogin.classList.add("lado-registro--mostrar");
  //muestra el formulario de registro
  formRegistro.classList.remove("main-register");
  formRegistro.classList.add("main-register--mostrar");
  
});
//es la misma logica de arriba ṕero esta vez mostrando y ocultando el contenido correspondiente
btnLogin.addEventListener("click", () =>{
  imagenFondo.classList.remove("imagen__fondo--derecha");
  imagenFondo.classList.add("imagen__fondo");
  //Ocultamos seccion registro
  formRegistro.classList.remove("main-register--mostrar");
  formRegistro.classList.add("main-register");
  //igual con la seccion de preguntar si ya esta registrado
  seccionLogin.classList.remove("lado-registro--mostrar");
  seccionLogin.classList.add("lado-registro");
  //Ahora mostramos de nuevo el login
  seccionRegistro.classList.remove("lado-login--oculto")
  seccionRegistro.classList.add("lado-login--mostrar");
  formLogin.classList.remove("main-login--oculto");
  
});
