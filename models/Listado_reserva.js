const Database = require('./database');
const bcryptjs = require('bcryptjs')
class Listado_reserva {
  constructor(nombre, tipo, fecha_ent, fecha_sal, precio) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.fecha_ent = fecha_ent;
    this.fecha_sal = fecha_sal;
    this.precio = precio;
  }

  static async obtenerTodos() {
    const db = new Database();
    await db.connect();
    try {
      const sql_l = 'SELECT * FROM habitaciones';
      const result_l = await db.query(sql_l);
      return result_l;
      retur
    } catch (error) {
      console.error(`Error al obtener los usuarios: ${error}`);
      return [];
    } finally {
      await db.disconnect();
    }
  }
}