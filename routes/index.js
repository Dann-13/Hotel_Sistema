const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');

// variables de session
const session = require('express-session');
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//------Modulo de Conexion
//const connection = require('./data/db')
const Database = require('../models/database');
//Inicializamos a base de datos 
const db = new Database();

//va las rutas
router.get('/', (req, res) => {
    res.render("index")
})
router.get('/login_register', (req, res) => {
    res.render("login_register")
})
//metodo que me registra usuarios
router.post('/login_register', async (req, res) => {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const rol = req.body.rol;
    let passwordHash = await bcryptjs.hash(contrasena, 8);
    try {
        const nuevoUsuario = new Usuario(correo, passwordHash, nombre,rol);
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
});
router.post('/auth', async (req, res) =>{
    const email = req.body.correo;
    const pass = req.body.pass;
    try{
        const result = await  Usuario.autenticar(email, pass);
        console.log(result);
        if(email && pass){
            if(result.length > 0){
                req.session.loggedin = true;
                req.session.nombre = result[0].nombre;
                req.session.correo = result[0].correo;
                req.session.rol = result[0].rol;
                if(result[0].rol == 'admin'){
                    res.render('login_register', {
                        alert3: true,
                        alertTitle: "Conexión Exitosa",
                        alertMessage: "Login Correcto Admin",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    })
                }else{
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
                
            }else{
                res.render('index');   
                console.log('ni esta regustrado')             
            }
            res.end()
        }else{
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
        
    }catch(err){
        console.log(err);
    }
});
//rutas del admin -----------
router.get('/admin', (req, res)=>{
    if(req.session.loggedin && req.session.rol === 'admin'){
        res.render('admin',{
            login:true,
            nombre: req.session.nombre
        });
    }else{
        res.render('admin',{
            login:false,
            name: "Inicia sesion pibe"
        })
    }
})
router.get('/admin_usuarios', async (req, res)=>{
    if(req.session.loggedin && req.session.rol === 'admin'){
        try{
            const usuarios = await Usuario.obtenerTodos();
            res.render('admin_usuarios',{
                login:true,
                nombre: req.session.nombre,
                usuarios:usuarios
            });
        }catch(err){
            console.log("error al obtener usuarios " + err)
            res.render('admin_usuarios',{
                login: true,
                nombre: req.session.nombre,
                usuarios: [] // En caso de error, pasar una lista vacía
            })

        }
        
    }else{
        res.render('admin_usuarios',{
            login:false,
            name: "Inicia sesion pibe"
        })
    }
});
router.get('/admin_reservas', (req, res)=>{
    if(req.session.loggedin && req.session.rol === 'admin'){
        res.render('admin_reservas',{
            login:true,
            nombre: req.session.nombre
        });
    }else{
        res.render('admin_reservas',{
            login:false,
            name: "Inicia sesion pibe"
        })
    }
});
router.get('/admin_edicion', (req, res)=>{
    if(req.session.loggedin && req.session.rol === 'admin'){
        res.render('admin_edicion',{
            login:true,
            nombre: req.session.nombre
        });
    }else{
        res.render('admin_edicion',{
            login:false,
            name: "Inicia sesion pibe"
        })
    }
});
//rutas del usuario
//Método para controlar que está auth en todas las páginas
router.get('/reserva', (req, res) => {
    if (req.session.loggedin) {
        res.render('reserva', {
            login: true,
            nombre: req.session.nombre
        });
    } else {
        res.render('reserva', {
            login: false,
            name: 'De click para Iniciar Sesion!',
        });
    }
    res.end();
});
//Routas globales
router.get('/logout', function (req, res) {
    req.session.destroy(() => {
        console.log('saliste pibe')
        res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
    })
});
router.get('/listado_reserva', (req, res) => {
    res.render("listado_reserva")
})

module.exports = router;
