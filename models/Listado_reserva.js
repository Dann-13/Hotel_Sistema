const Database = require('./database');

class Listado_reserva {
  constructor( id_usuario, id_habitacion, fecha_llegada, fecha_salida, precio_total) {
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
      console.log("resultados  " + result);
      return result;

    } catch (error) {
      console.error(`Error al obtener los usuarios: ${error}`);
      return [];
    } finally {
      await db.disconnect();
    }
  }
  async registrar() {
    const db = new Database();
    await db.connect();

    try {
      const sql = 'INSERT INTO reservas (id_usuario, id_habitacion, fecha_llegada, fecha_salida, precio_total) VALUES (?, ?, ?, ?, ?)';
      const values = [this.id_usuario, this.id_habitacion, this.fecha_llegada, this.fecha_salida, this.precio_total];
      await db.query(sql, values);
      console.log('Reserva registrada correctamente');
    } catch (error) {
      console.error(`Error al registrar el usuario: ${error}`);
    } finally {
      await db.disconnect();
    }
  }

  static async obtenerPorId(id) {
    const db = new Database();
    await db.connect();
    try {
      console.log(id);
      const sql = 'SELECT * FROM reservas WHERE id_usuario = ?';
      const result = await db.query(sql, [id]);
      return result;
    } catch (err) {
      console.error(`Error al obtener el usuario por ID: ${err}`);
      throw err;
    } finally {
      await db.disconnect();
    }
  }
  static async obtenerPorIdReserva(id) {
    const db = new Database();
    await db.connect();
    try {
      const sql = 'SELECT * FROM reservas WHERE id_reserva = ?';
      const result = await db.query(sql, [id]);
      console.log('reservas' + result)
      return result;
    } catch (err) {
      console.error(`Error al obtener la reserva por ID: ${err}`);
      throw err;
    } finally {
      await db.disconnect();
    }
  }
  


  static async actualizarPorIdUsuario(id, datosActualizados) {
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
  static async actualizarPorIdReserva(id, datosActualizados) {
    const db = new Database();
    await db.connect();
    try {
      const { id_usuario, id_habitacion, fecha_llegada, fecha_salida, precio_total } = datosActualizados;
      console.log('datos que llegan de index' +datosActualizados)
      const sql = 'UPDATE reservas SET id_usuario = ?, id_habitacion = ?, fecha_llegada = ?, fecha_salida = ?, precio_total = ? WHERE id_reserva = ?';
      const values = [id_usuario, id_habitacion, fecha_llegada, fecha_salida, precio_total, id];
      await db.query(sql, values);
      console.log('Usuario actualizado correctamente');
    } catch (error) {
      console.error(`Error al actualizar el usuario: ${error}`);
      throw error;
    } finally {
      await db.disconnect();
    }
  }
  static async eliminarPorIdReserva(id_reserva) {
    const db = new Database();
    await db.connect();
    try {
      const sql = 'DELETE FROM reservas WHERE id_reserva = ?';
      const values = [id_reserva];
      await db.query(sql, values);
      console.log('Reserva eliminada correctamente');
    } catch (err) {
      console.error(`Error al eliminar la reserva: ${err}`);
      throw err;
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
