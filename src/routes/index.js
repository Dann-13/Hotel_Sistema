const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

//------Modulo de Conexion
//const connection = require('./data/db')
const Database = require('../models/database');
//Inicializamos a base de datos 
const db = new Database();
db.connect();
//va las rutas
router.get('/', (req, res) => {
    res.render("index")
})
router.get('/login_register', (req, res) => {
    res.render("login_register")
})

router.post('/login_register', async (req, res) => {
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
        console.log(error)
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
});

module.exports = router;
