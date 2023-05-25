const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const Usuario = require('../../models/Usuario');
const Listado_reserva = require('../../models/Listado_reserva');
const Habitaciones = require('../../models/Habitacion');


// variables de session
const session = require('express-session');
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//------Modulo de Conexion
//const connection = require('./data/db')
const Database = require('../../models/database');
//Inicializamos a base de datos 
const db = new Database();

const mostrarAdmin = (req, res) => {

    if (req.session.loggedin && req.session.rol === 'admin') {
        res.render('admin', {
            login: true,
            nombre: req.session.nombre
        });
    } else {
        res.render('admin', {
            login: false,
            name: "Inicia sesion pibe"
        })
    }

}
//ruta del administrador, lista los usuarios registrados
const mostrarAdminUsuariosSistema = async (req, res) => {
    if (req.session.loggedin && req.session.rol === 'admin') {
        try {
            const usuarios = await Usuario.obtenerTodos();
            res.render('admin_usuarios', {
                login: true,
                nombre: req.session.nombre,
                usuarios: usuarios
            });
        } catch (err) {
            console.log("error al obtener usuarios " + err)
            res.render('admin_usuarios', {
                login: true,
                nombre: req.session.nombre,
                usuarios: [] // En caso de error, pasar una lista vacía
            })

        }

    } else {
        res.render('admin_usuarios', {
            login: false,
            name: "Inicia sesion pibe"
        })
    }
}

//Funcion que recive y envia datos para actualizar a un usuario en la base de datos POST
const actualizarUsuario = async (req, res) => {
    const usuarioId = req.body.id;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const rol = req.body.rol;
    console.log("este es el rol" + rol)
    try {
        await Usuario.actualizar(usuarioId, { correo, contrasena, nombre, rol });
        res.redirect('/admin_usuarios')
    } catch (err) {
        console.log(err);
        res.redirect('/admin_usuarios')
    }

}
//Funcion que enseña la vista admin edicion para editar a un usuario en especifico GET
const mostrarAdminEdicionUsuario = async (req, res) => {
    if (req.session.loggedin && req.session.rol === 'admin') {
        const usuarioId = req.params.id;
        try {
            const usuario = await Usuario.obtenerPorId(usuarioId);
            res.render('admin_edicion', {
                login: true,
                usuario: usuario
            });
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
            res.redirect('/admin_usuarios'); // En caso de error, redireccionar a la página de usuarios
        }
    } else {
        res.render('admin_edicion', {
            login: false,
            name: "Inicia sesion pibe"
        })
    }

}
const eliminarUsuario = async (req, res) => {
    if (req.session.loggedin && req.session.rol === 'admin') {
        const usuarioId = req.params.id;
        try {
            await Usuario.eliminarPorId(usuarioId);
            res.redirect('/admin_usuarios')
        } catch (err) {
            console.error('Error al eliminar el usuario:', err);
            res.redirect('/admin_usuarios')

        }
    } else {
        res.redirect('/admin_usuarios');
    }

}
//---------Reservas
//ruta del administrador, lista las reservas registradas
const mostrarAdminReservasSistema = async (req, res) => {
    if (req.session.loggedin && req.session.rol === 'admin') {
        const reservas = await Listado_reserva.obtenerTodosReservas();

        res.render('admin_reservas', {
            login: true,
            nombre: req.session.nombre,
            reservas: reservas
        });
    } else {
        res.render('admin_reservas', {
            login: false,
            name: "Inicia sesion pibe"
        })
    }
}
// funcion ruta que mostrara el admin_edicionReservas, metodo GET
const mostrarAdminEdicionReservas = async (req, res) => {
    if (req.session.loggedin && req.session.rol === 'admin') {
        const id_reserva = req.params.id;
        try {
            const reserva = await Listado_reserva.obtenerPorIdReserva(id_reserva);
            const habitaciones = await Habitaciones.obtenerTodos();

            res.render('admin_edicionReservas', {
                login: true,
                reserva: reserva,
                habitaciones:habitaciones,
                
            });
        } catch (err) {
            console.error('Error al obtener la reserva:', err);
            res.redirect('/admin_reservas'); // En caso de error, redireccionar a la página de usuarios
        }
    } else {
        res.render('admin_reservas', {
            login: false,
            name: 'inicia sesion pibe'
        })
    }
}
//funcion que recibe datos del ejs y posteriormente los envia a la base de datos, Metodo Post
const actualizarReserva = async (req, res) => {
    const reservaId = req.body.id;
    const usuario = req.body.usuario;
    const habitacion = req.body.habitacion;
    const fecha_llegada = req.body.fecha_llegada;
    const fecha_salida = req.body.fecha_salida;
    const precio_total = req.body.precio_total;
    try {
        await Listado_reserva.actualizarPorIdReserva(reservaId, { usuario, habitacion, fecha_llegada, fecha_salida, precio_total });
        res.redirect('/admin_reservas')
    } catch (err) {
        console.log(err);
        res.redirect('/admin_reservas')
    }
}
const eliminarReserva = async (req, res) => {
    if (req.session.loggedin && req.session.rol === 'admin') {
        const reservaId = req.params.id;
        try {
            await Listado_reserva.eliminarPorIdReserva(reservaId);
            res.redirect('/admin_reservas')
        } catch (err) {
            console.error('Error al eliminar el usuario:', err);
            res.redirect('/admin_reservas')

        }
    } else {
        res.redirect('/admin_reservas');
    }
}
const habitaciones = async () => {
    const habitacion = await Habitaciones.obtenerTodos();
    console.log(habitacion);
    return habitacion;
}

  

module.exports = {
    mostrarAdmin,
    mostrarAdminUsuariosSistema,
    actualizarUsuario,
    eliminarUsuario,
    mostrarAdminEdicionUsuario,
    mostrarAdminReservasSistema,
    mostrarAdminEdicionReservas,
    actualizarReserva,
    eliminarReserva,
    habitaciones
}