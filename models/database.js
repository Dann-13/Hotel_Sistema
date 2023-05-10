const mysql = require('mysql2/promise');
//invocacion y variables de entorno configuracion 
require('dotenv').config({ path: __dirname + '/../env/.env' });
class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    console.log(process.env.DB_HOST)
    try {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
      });
      await this.connection.query(`USE hotel`);

      console.log('Conexión a la base de datos establecida');
    } catch (error) {
      console.error(`Error al conectarse a la base de datos: ${error}`);
    }
  }

  async query(sql, values) {
    try {
      const [results, fields] = await this.connection.execute(sql, values);
      return results;
    } catch (error) {
      console.error(`Error al ejecutar la consulta: ${error}`);
      return null;
    }
  }

  async disconnect() {
    try {
      await this.connection.end();
      console.log('Conexión a la base de datos cerrada');
    } catch (error) {
      console.error(`Error al cerrar la conexión a la base de datos: ${error}`);
    }
  }
}

module.exports = Database;
