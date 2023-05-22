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
      console.log(result[0])
      return result[0];
    } catch (err) {
      console.error(`Error al obtener el usuario por ID: ${err}`);
      throw err;
    } finally {
      await db.disconnect();
    }
  }
}

module.exports = Listado_reserva;
