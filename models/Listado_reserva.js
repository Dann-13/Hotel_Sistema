const Database = require('./database');

class Listado_reserva {
  constructor(id_reserva, id_usuario,id_habitacion,  fecha_llegada, fecha_salida, precio_total) {
    this.id_reserva = id_reserva;
    this.id_usuario = id_usuario;
    this.id_habitacion = id_habitacion;
    this.fecha_llegada = fecha_llegada;
    this.fecha_salida = fecha_salida;
    this.precio_total = precio_total;
  }

  static async obtenerTodosReservas() {
    const db = new Database();
    await db.connect();

    try {
      const sql = 'SELECT * FROM reservas';
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
      console.log(id);
      const sql = `SELECT * FROM reservas WHERE id_usuario = ${id} `
      const result = await db.query(sql);
      return result;
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
      const { id_reserva, id_habitacion, fecha_llegada, fecha_salida, precio_total } = datosActualizados;
      const sql = 'UPDATE reservas SET id_reserva = ?, id_habitacion = ?, fecha_llegada = ?, fecha_salida = ?, precio_total = ? WHERE id_usuario = ?';
      const values = [id_reserva, id_habitacion, fecha_llegada, fecha_salida, precio_total, id];
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
      const sql = 'DELETE FROM reservas WHERE id_usuario = ?';
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

module.exports = Listado_reserva;
