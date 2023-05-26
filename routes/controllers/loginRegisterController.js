const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const Usuario = require('../../models/Usuario');
const Listado_reserva = require('../../models/Listado_reserva');


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
//muestra la vista del login 
const mostrarLoginRegister = (req, res) =>{
    res.render("login_register")
}
//Registro de un usuario 
const resgistarUsuario = async(req, res) =>{
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const rol = req.body.rol;
    let passwordHash = await bcryptjs.hash(contrasena, 8);
    try {
        const nuevoUsuario = new Usuario(correo, passwordHash, nombre, rol);
        //esperamos que termine de registrar para seguir la ejecucion de lo de abajo
        await nuevoUsuario.registrar();
        res.render('login_register', {
            alert1: true,
            alertTitle: 'Registro',
            alertMessage: 'Registro Exitoso',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: '',
        });
    } catch (error) {
        console.log(error);
        res.render('login_register', {
            alert1: true,
            alertTitle: 'Error',
            alertMessage: 'Incorrecto',
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: '',
        });
    }

}
//La autentificacion de uduario y creacion de variables de session
const autentificacionUsuario = async (req, res) =>{
    const email = req.body.correo;
    const pass = req.body.pass;
    try {
        const result = await Usuario.autenticar(email, pass);
        if (email && pass) {
            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.nombre = result[0].nombre;
                req.session.correo = result[0].correo;
                req.session.rol = result[0].rol;
                req.session.id_usuario = result[0].id_usuario;
                if (result[0].rol == 'admin') {
                    res.render('login_register', {
                        alert3: true,
                        alertTitle: "Conexión Exitosa",
                        alertMessage: "Login Correcto Admin",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    })
                } else {
                    res.render('login_register', {
                        alert2: true,
                        alertTitle: "Conexión Exitosa",
                        alertMessage: "Login Correcto Usuario",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    })
                }

            } else {
                res.render('index');
                console.log('ni esta regustrado')
            }
            res.end()
        } else {
            res.render('login_register', {
                alert1: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese una contraseña",
                alertIcon: "warning",
                showConfirmButton: false,
                timer: 1500,
                ruta: 'login_register'
            });

        }

    } catch (err) {
        console.log(err);
    }

}

module.exports = {
    mostrarLoginRegister,
    resgistarUsuario,
    autentificacionUsuario
}