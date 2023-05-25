/* // script.js
flatpickr("#fecha_llegada", {
    dateFormat: "Y-m-d",  // Formato de la fecha a enviar al servidor
}); */
/* const fechaLlegadaInput = document.getElementById("fecha_llegada");
 */flatpickr("#fecha_llegada", {
     dateFormat: "Y-m-d",  // Formato de la fecha a enviar al servidor
     minDate: new Date().fp_incr(-1), // Establecer un día antes como fecha mínima
     maxDate: new Date().fp_incr(1), // Establecer un día después como fecha máxima
 });
flatpickr("#fecha_salida", {
    dateFormat: "Y-m-d",  // Formato de la fecha a enviar al servidor
});
