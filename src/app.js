//invocamos express
const express = require('express');
const app = express();
//url encoded para que  no de error en el envio de formularios
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//invocacion y variables de entorno configuracion 
const dotenv =require('dotenv');
dotenv.config({path:"./env/.env"})

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
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

//------Modulo de Conexion
//const connection = require('./data/db')
const DataBase = require('./models/database');
//Inicializamos a base de datos 
DataBase.connect();
//----rutas
app.get('/', (req, res) =>{
    res.render("index")
})
app.get('/login', (req, res) =>{
    res.render("login_register")
})
app.listen(5000, ()=>{
    console.log("servidor en http://localhost:5000")
})