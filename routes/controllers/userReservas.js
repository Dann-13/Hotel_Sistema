const express = require('express');
const router = express.Router();
const Listado_reserva = require('../../models/Listado_reserva');
const Habitacion = require('../../models/Habitacion');

//Método para controlar que está auth en todas las páginas
const mostarVistaReserva = async (req, res) => {
    if (req.session.loggedin && req.session.rol == "user") {

        const habitacion = await Habitacion.obtenerTodos();

        res.render('reserva', {
            login: true,
            nombre: req.session.nombre,
            habitacion: habitacion,
            id_usuario: req.session.id_usuario
        });
    } else {
        res.render('reserva', {
            login: false,
            name: 'De click para Iniciar Sesion!',
        });
    }
    res.end();
}
//post donde el usuario reserva 
const registroReservaUsuario = async (req, res) => {
    const id_habitacion = parseInt(req.body.id_habitacion, 10);
    console.log('id ' + id_habitacion)
    const id_usuario = parseInt(req.body.id_usuario, 10);
    console.log('user ' + id_usuario)
    const fecha_llegada = new Date(req.body.fecha_llegada);
    console.log('llegada ' + fecha_llegada)
    const fecha_salida = new Date(req.body.fecha_salida);
    console.log('salida ' + fecha_salida)
    const precio_total = parseFloat(req.body.precio_total);
    console.log('precio ' + precio_total)
    try {
        const nuevaReserva = new Listado_reserva(id_usuario, id_habitacion, fecha_llegada, fecha_salida, precio_total);
        await nuevaReserva.registrar();
        const habitacion = await Habitacion.obtenerTodos();
        res.render('reserva', {
            login: true,
            nombre: req.session.nombre,
            habitacion: habitacion,
            id_usuario: req.session.id_usuario,
            alert: true,
            alertTitle: 'Reserva exitosa',
            alertMessage: '¡Tu reserva ha sido registrada!',
            alertType: 'success'
        });
    } catch (err) {
        console.log(err);

    }
}

module.exports = {
    mostarVistaReserva,
    registroReservaUsuario
}