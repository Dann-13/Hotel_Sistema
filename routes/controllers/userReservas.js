const Listado_reserva = require('../../models/Listado_reserva');
const Habitacion = require('../../models/Habitacion');
const Usuario = require('../../models/Usuario');
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
//Ruta para mostrar las reservas del usuario
const mostrarReservasUsuario = async (req, res) =>{
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
}
//Ruta een la que se enseña la vista de edicion y los datos de una determinada reserva

const edicionReservaUsuario = async (req, res) => {
    if (req.session.loggedin && req.session.rol === 'user') {
        const id = req.params.id;
        try {
            const listado = await Listado_reserva.obtenerPorIdReserva(id);
            const habitaciones = await Habitacion.obtenerTodos();

            console.log(listado);
            res.render('user_edicionReserva', {
                login: true,
                listado: listado,
                habitaciones:habitaciones
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
}
//post en donde se recive los datos y se actualiza dicha reserva
const actualizarReservaUsuario = async (req, res) => {
    const id_reserva = parseInt(req.body.id_reserva,10)
    console.log(id_reserva);
    const id_usuario = parseInt(req.body.id, 10)
    console.log(id_usuario);
    const id_habitacion =parseInt( req.body.id_habitacion, 10)
    console.log(id_habitacion);
    const fecha_llegada = new Date(req.body.fecha_llegada);
    console.log(fecha_llegada);
    const fecha_salida = new Date(req.body.fecha_salida);
    console.log(fecha_salida);
    const precio_total =  parseFloat(req.body.precio_total);
    console.log(precio_total);
    try {
        await Listado_reserva.actualizarPorIdReserva(id_reserva, { id_usuario, id_habitacion, fecha_llegada, fecha_salida,precio_total });
        res.redirect('/listado_reserva')
    } catch (err) {
        console.log(err);
        res.redirect('/listado_reserva')
    }
}

const eliminarReserva = async(req, res) =>{
    if (req.session.loggedin && req.session.rol === 'user') {
        const id_reserva = req.params.id_reserva;
        console.log("Eliminación de reserva: " + id_reserva);
        try {
            await Listado_reserva.eliminarPorIdReserva(id_reserva);
            res.redirect('/listado_reserva');
        } catch (err) {
            console.error('Error al eliminar la reserva:', err);
            res.redirect('/listado_reserva');
        }
    } else {
        res.redirect('/listado_reserva');
    }
}
module.exports = {
    mostarVistaReserva,
    registroReservaUsuario,
    mostrarReservasUsuario,
    edicionReservaUsuario,
    actualizarReservaUsuario,
    eliminarReserva
}