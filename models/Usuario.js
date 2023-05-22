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
        return result;
      }
    } catch (error) {
      console.error(`Error al autenticar el usuario: ${error}`);
      return false;
    } finally {
      await db.disconnect();
    }
  }
  static async obtenerTodos() {
    const db = new Database();
    await db.connect();

    try {
      const sql = 'SELECT * FROM usuarios';
      const result = await db.query(sql);
      return result;
    } catch (error) {
      console.error(`Error al obtener los usuarios: ${error}`);
      return [];
    } finally {
      await db.disconnect();
    }
  }
  static async obtenerPorId(id) {
    const db = new Database();
    await db.connect();
    try {
      const sql = `SELECT * FROM usuarios WHERE id_usuario = ${id} `
      const result = await db.query(sql);
      console.log(result[0])
      return result[0];
    } catch (err) {
      console.error(`Error al obtener el usuario por ID: ${err}`);
      throw err;
    } finally {
      await db.disconnect();
    }

  }
  static async actualizar(id, datosActualizados) {
    const db = new Database();
    await db.connect();
    try {
      const { correo, contrasena, nombre, rol } = datosActualizados;
      const sql = 'UPDATE usuarios SET correo = ?, contrasena = ?, nombre = ?, rol = ? WHERE id_usuario = ?';
      const values = [correo, contrasena, nombre, rol, id];
      await db.query(sql, values);
      console.log('Usuario actualizado correctamente');
    } catch (error) {
      console.error(`Error al actualizar el usuario: ${error}`);
      throw error;
    } finally {
      await db.disconnect();
    }
  }
  static async eliminarPorId(id) {
    const db = new Database();
    await db.connect();
    try {
      const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
      const values = [id];
      await db.query(sql, values);
      console.log('Usuario eliminado correctamente');

    } catch (err) {
      console.error(`Error al eliminar el usuario: ${err}`);
      console.log(err);
    } finally {
      await db.disconnect();
    }
  }

}

module.exports = Usuario;
