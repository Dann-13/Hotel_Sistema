const Database = require('./database');
class Habitacion {
    static async obtenerTodos() {
        const db = new Database();
        await db.connect();

        try {
            const sql = 'SELECT * FROM habitaciones';
            const result = await db.query(sql);
            return result;
        } catch (error) {
            console.error(`Error al obtener los usuarios: ${error}`);
            return [];
        } finally {
            await db.disconnect();
        }
    }
}
module.exports = Habitacion;
