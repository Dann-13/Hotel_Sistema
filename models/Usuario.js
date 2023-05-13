const Database = require('./database');
const bcryptjs = require('bcryptjs')
class Usuario {
  constructor(correo, contrasena, nombre, rol) {
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.rol = rol;
  }

  async registrar() {
    const db = new Database();
    await db.connect();

    try {
      const sql = 'INSERT INTO usuarios (correo, contrasena, nombre, rol) VALUES (?, ?, ?, ?)';
      const values = [this.correo, this.contrasena, this.nombre, this.rol];
      await db.query(sql, values);
      console.log('Usuario registrado correctamente');
    } catch (error) {
      console.error(`Error al registrar el usuario: ${error}`);
    } finally {
      await db.disconnect();
    }
  }
  static async autenticar(correo, contrasena) {
    const db = new Database();
    await db.connect();

    try {
      const sql = 'SELECT * FROM usuarios WHERE correo = ?';
      const values = [correo];
      const result = await db.query(sql, values);
      //no esta
      if (result.length == 0 || !(await bcryptjs.compare(contrasena, result[0].contrasena))) {
        return false;
      } else { //esta 
        return true;
      }
    } catch (error) {
      console.error(`Error al autenticar el usuario: ${error}`);
      return false;
    } finally {
      await db.disconnect();
    }
  }
  
}

module.exports = Usuario;
