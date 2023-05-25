const express = require('express');
const router = express.Router();
const loginRegisterController = require('./controllers/loginRegisterController');
const adminController = require('./controllers/adminController')
const Usuario = require('../models/Usuario');
const Listado_reserva = require('../models/Listado_reserva');
const Habitacion = require('../models/Habitacion');


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
//----Rutas del Login
router.get('/login_register', loginRegisterController.mostrarLoginRegister);
//metodo que me registra usuarios
router.post('/login_register', loginRegisterController.resgistarUsuario);
router.post('/auth', loginRegisterController.autentificacionUsuario)
//----------------rutas del admin -----------
//ruta del admin
router.get('/admin', adminController.mostrarAdmin);
//ruta encargada de cargar la vista admin_ usuario y a su vez conectar a la base de datos y listarlos
router.get('/admin_usuarios', adminController.mostrarAdminUsuariosSistema);
//ruta encargada de cargar las reservas del sistema
router.get('/admin_reservas', adminController.mostrarAdminReservasSistema);
//rutas para la funcionalidad de edicion de usuario por su id especiico (admin_edicion y guardad_edicion)
router.get('/admin_edicion/:id', adminController.mostrarAdminEdicionUsuario);
//ruta que sirve para recivir los datos de la edicion para enviarlos a la db
router.post('/guardar_edicion', adminController.actualizarUsuario);
//ruta que elimina a un usuario o admin de la base de datos
router.get('/eliminar_usuario/:id', adminController.eliminarUsuario);
//ruta para mostar la vista de edicion reserva 
router.get('/admin_edicionReservas/:id', adminController.mostrarAdminEdicionReservas);
//ruta que recive los datos 
router.post('/guardar_edicionReserva', adminController.actualizarReserva);
//eliminar reserva por id de reserva
router.get('/eliminar_usuario_reserva/:id', adminController.eliminarReserva);
//--------------rutas del usuario-----------
//Método para controlar que está auth en todas las páginas
router.get('/reserva', async (req, res) => {
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
});
//Routas globales
router.get('/logout', function (req, res) {
    req.session.destroy(() => {
        console.log('saliste pibe')
        res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
    })
});
router.get('/listado_reserva', async (req, res) => {
    if (req.session.loggedin && req.session.rol === 'user') {
        try {
            const listado_reserva = await Listado_reserva.obtenerPorId(req.session.id_usuario);
            const usuarios = await Usuario.obtenerTodos();
            res.render('listado_reserva', {
                login: true,
                nombre: req.session.nombre,
                listado: listado_reserva,
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

router.get('/user_eliminar', (req, res) => {
    res.render("user_eliminar")
})

router.get('/user_edicion/:id', async (req, res) => {
    if (req.session.loggedin && req.session.rol === 'user') {
        const id = req.params.id;
        try {
            const listado = await Listado_reserva.obtenerPorIdReserva(id);
            console.log(listado);
            res.render('user_edicion', {
                login: true,
                listado: listado
            });
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
            res.redirect('/listado_reserva'); // En caso de error, redireccionar a la página de usuarios
        }
    } else {
        res.render('listado_reserva', {
            login: false,
            name: "Inicia sesion pibe"
        })
    }
});

router.post('/edicion_usuario_reserva', async (req, res) => {
    const id_reserva = req.body.id_reserva;
    const id_usuario = req.body.id;
    const id_habitacion = req.body.id_habitacion;
    const fecha_llegada = req.body.fecha_llegada;
    const fecha_salida = req.body.fecha_salida;
    const precio_total = req.body.precio_total;
    try {
        await Listado_reserva.actualizar(id_usuario, { id_reserva, id_habitacion, fecha_llegada, fecha_salida,precio_total });
        res.redirect('/listado_reserva')
    } catch (err) {
        console.log(err);
        res.redirect('/listado_reserva')
    }
});

router.get('/eliminar_usuario_reserva/:id', async (req, res) => {
    if (req.session.loggedin && req.session.rol === 'user') {
        const id_usuario = req.params.id;
        try {
            await Usuario.eliminarPorId(id_usuario);
            res.redirect('/listado_reserva')
        } catch (err) {
            console.error('Error al eliminar el usuario:', err);
            res.redirect('/listado_reserva')

        }
    } else {
        res.redirect('/listado_reserva');
    }
})

module.exports = router;
