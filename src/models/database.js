const mysql = require('mysql');
class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
    }
    connect(){
        this.connection.connect((err) => {
            if(err){
                console.log(err)
                return;
            }
            console.log("Conexion exitosa")
        })
    }
}
module.exports = new Database();