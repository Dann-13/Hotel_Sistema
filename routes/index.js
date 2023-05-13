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
//metodo que me registra usuarios o admins
router.post('/login_register', async (req, res) => {
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
            alert: true,
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
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Incorrecto',
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: '',
        });
    }
});
//la utentificacion o login
/* router.post('/auth', async (req, res) => {
    const email = req.body.correo;
    console.log(email)
    const pass = req.body.pass;
    console.log(pass)
    let passwordHaash = await bcryptjs.hash(pass, 8);
    if (email && pass) {
        try {
            await db.connect();
            const sql = 'SELECT * FROM usuarios WHERE correo = ?';
            const values = [email];
            const result = await db.query(sql, values);
            if (result.length == 0 || !(await bcryptjs.compare(pass, result[0].contrasena))) {
                res.send('usuario o contraseña incorrectas ')
                res.render('login_register', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Email y/o Identificacion Incorrectas",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login_register'
                });
            } else {
                //variables de sesiones 
                //si todo esta bien el usuario tendra una sesion iniciada
                req.session.loggedin = true;
                //traemos el nombre de la tabla 
                req.session.nombre = result[0].nombre;
                res.render('login_register', {
                    alert: true,
                    alertTitle: "Conexión Exitosa",
                    alertMessage: "Login Correcto",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                })
            }
        } catch (err) {
            console.log(err)
        }
    } else {
        res.render('login_register', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese una contraseña",
            alertIcon: "warning",
            showConfirmButton: false,
            timer: 1500,
            ruta: 'login_register'
        })
    }


}) */
router.post('/auth', async (req, res) =>{
    const email = req.body.correo;
    const pass = req.body.pass;
    try{
        const result = await  Usuario.autenticar(email, pass);
        if(email && pass){
            if(result){
                res.render('reserva');
            }else{
                res.render('index');
                res.send("NO estas registrado")
            }
        }else{
            res.render('login_register', {
                alert: true,
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
//autenticado usuario para todas las paginas 


//crean formulario con el mismo nombre "reserva"
router.get('/reserva', (req, res) => {
    res.render("reserva")
})
router.get('/listado_reserva', (req, res) => {
    res.render("listado_reserva")
})

module.exports = router;
