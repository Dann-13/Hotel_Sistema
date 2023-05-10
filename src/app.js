//invocamos express
const express = require('express');
const app = express();
//url encoded para que  no de error en el envio de formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//directorio public y confguracion para funcionamiento en otras pc
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'))

//motor de platillas 
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));


//para encriptar contraseñas 
const bcryptjs = require('bcryptjs');

//variables de session 
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//------Modulo de Conexion
//const connection = require('./data/db')
const Database = require('./models/database');
//Inicializamos a base de datos 
const db = new Database();
db.connect();
//----rutas
app.get('/', (req, res) => {
    res.render("index")
})
app.get('/login_register', (req, res) => {
    res.render("login_register")
})
//registro usuario
app.post('/login_register', async (req, res) => {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const nombre = req.body.nombre;
    const rol = req.body.rol;
    let passwordHash = await bcryptjs.hash(contrasena, 8);
    // Insertar el nuevo usuario en la base de datos
    try {
        const sql = 'INSERT INTO usuarios (correo, contrasena, nombre, rol) VALUES (?, ?, ?, ?)';
        const values = [correo, passwordHash, nombre, rol];
        await db.query(sql, values);
        res.render('login_register', {
            alert: true,
            alertTitle: "Registro",
            alertMessage: "Registro Exitoso",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: ''
        })
    } catch (error) {
        res.render('login_register', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Incorrecto",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: ''
        });
    }
})
app.listen(5000, () => {
    console.log("servidor en http://localhost:5000")
})