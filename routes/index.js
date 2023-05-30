const express = require('express');
const router = express.Router();
const loginRegisterController = require('./controllers/loginRegisterController');
const adminController = require('./controllers/adminController')
const userController = require('./controllers/userReservas');

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
//Routas globales
router.get('/logout', function (req, res) {
    req.session.destroy(() => {
        console.log('saliste pibe')
        res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
    })
});
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
router.get('/reserva', userController.mostarVistaReserva);
//ruta post que trae la reserva del usuario
router.post('/reserva', userController.registroReservaUsuario);
//Ruta para mostrar las reservas del usuario
router.get('/listado_reserva', userController.mostrarReservasUsuario)
//Ruta een la que se enseña la vista de edicion y los datos de una determinada reserva
router.get('/user_edicionReserva/:id', userController.edicionReservaUsuario);
//ruta para el usuario edite una reserva especifica
router.post('/edicion_usuario_reserva', userController.actualizarReservaUsuario);
//ruta para que el usuario elimine una reserva especifica
router.get('/eliminarReservaUsuario/:id_reserva', userController.eliminarReserva);

module.exports = router;
