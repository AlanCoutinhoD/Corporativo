const db = require('../config/database');

class Expediente {
    static async create(expedienteData) {
        const [result] = await db.execute(
            'INSERT INTO expedientes (actor, demandado, expediente, tipo_de_juicio, fecha_de_inicio, autoridad_responsable, procedimiento_realizado, procedimiento_actual, procedimiento_actual_2025, tipo_expediente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                expedienteData.actor,
                expedienteData.demandado,
                expedienteData.expediente,
                expedienteData.tipo_de_juicio,
                expedienteData.fecha_de_inicio,
                expedienteData.autoridad_responsable,
                expedienteData.procedimiento_realizado,
                expedienteData.procedimiento_actual,
                expedienteData.procedimiento_actual_2025,
                expedienteData.tipo_expediente
            ]
        );
        return result;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM expedientes');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM expedientes WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, expedienteData) {
        const [result] = await db.execute(
            'UPDATE expedientes SET actor = ?, demandado = ?, expediente = ?, tipo_de_juicio = ?, fecha_de_inicio = ?, autoridad_responsable = ?, procedimiento_realizado = ?, procedimiento_actual = ?, procedimiento_actual_2025 = ?, tipo_expediente = ? WHERE id = ?',
            [
                expedienteData.actor,
                expedienteData.demandado,
                expedienteData.expediente,
                expedienteData.tipo_de_juicio,
                expedienteData.fecha_de_inicio,
                expedienteData.autoridad_responsable,
                expedienteData.procedimiento_realizado,
                expedienteData.procedimiento_actual,
                expedienteData.procedimiento_actual_2025,
                expedienteData.tipo_expediente,
                id
            ]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM expedientes WHERE id = ?', [id]);
        return result;
    }

    static async search(searchTerm) {
        const [rows] = await db.execute(
            'SELECT * FROM expedientes WHERE actor LIKE ? OR demandado LIKE ? OR expediente LIKE ?',
            [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
        );
        return rows;
    }

    static async searchByTipo(tipoExpediente) {
        const [rows] = await db.execute(
            'SELECT * FROM expedientes WHERE tipo_expediente = ?',
            [tipoExpediente]
        );
        return rows;
    }
}

module.exports = Expediente;