//este archivo servira para hacer la conexion a la base de datos
const mysql = require('mysql');
const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE

});
conection.connect((err) => {
    if(err){
        console.log(err)
        return;
    }
    console.log("exito")
    
})
module.exports = conection;