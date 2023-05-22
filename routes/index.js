const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');
const Listado_reserva = require('../models/Listado_reserva');


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
});
router.post('/auth', async (req, res) => {
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
                req.session.id = result[0].id;
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
});
//----------------rutas del admin -----------
//ruta del admin
router.get('/admin', (req, res) => {
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
})
//ruta encargada de cargar la vista admin_ usuario y a su vez conectar a la base de datos y listarlos
router.get('/admin_usuarios', async (req, res) => {
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
});
router.get('/admin_reservas', (req, res) => {
    if (req.session.loggedin && req.session.rol === 'admin') {
        res.render('admin_reservas', {
            login: true,
            nombre: req.session.nombre
        });
    } else {
        res.render('admin_reservas', {
            login: false,
            name: "Inicia sesion pibe"
        })
    }
});
//rutas para la funcionalidad de edicion de usuario por su id especiico (admin_edicion y guardad_edicion)
router.get('/admin_edicion/:id', async (req, res) => {
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
});
//ruta que sirve para recivir los datos de la edicion para enviarlos a la db
router.post('/guardar_edicion', async (req, res) => {
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
});
//ruta que elimina a un usuario o admin de la base de datos
router.get('/eliminar_usuario/:id', async (req, res) => {
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
})
//--------------rutas del usuario-----------
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
router.get('/listado_reserva', async (req, res) => {
    console.log(req.session.id);
    if (req.session.loggedin && req.session.rol === 'user') {
        try {
            const listado_reserva = await Listado_reserva.obtenerPorId(req.session.id);
            const usuarios = await Usuario.obtenerTodos();
            res.render('listado_reserva', {
                login: true,
                nombre: req.session.nombre,
                listado_reserva: listado_reserva,
                usuarios: usuarios
            });
        } catch (err) {
            console.log("error al obtener usuarios " + err)
            res.render('listado_reserva', {
                login: true,
                nombre: req.session.nombre,
                usuarios: [] // En caso de error, pasar una lista vacía
            })

        }

    } else {
        res.render('listado_reserva', {
            login: false,
            name: "Inicia sesion pibe"
        })
    }
})

module.exports = router;
