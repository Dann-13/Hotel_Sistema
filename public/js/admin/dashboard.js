const toggle = document.querySelector(".toggle")
const menuDashboard = document.querySelector(".menu-dashboard")
const iconoMenu = toggle.querySelector("i")
const enlacesMenu = document.querySelectorAll(".enlace")

toggle.addEventListener("click", () => {
    menuDashboard.classList.toggle("open")

    if(iconoMenu.classList.contains("bx-menu")){
        iconoMenu.classList.replace("bx-menu", "bx-x")
    }else {
        iconoMenu.classList.replace("bx-x", "bx-menu")
    }
})

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menuDashboard.classList.add("open")
        iconoMenu.classList.replace("bx-menu", "bx-x")
    })
})

const botonOpciones = document.getElementById('boton-opciones');
const opciones = document.getElementById('opciones');

botonOpciones.addEventListener('click', () => {
    opciones.classList.toggle('mostrar');
  opciones.classList.toggle('menu__opciones');
});

document.addEventListener('click', (event) => {
  if (!botonOpciones.contains(event.target) && !opciones.contains(event.target)) {
    opciones.classList.add('menu__opciones');
  }
});
