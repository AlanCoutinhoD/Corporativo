const Expediente = require('../models/expedienteModel');

const expedienteController = {
    // Crear nuevo expediente
    create: async (req, res) => {
        try {
            const result = await Expediente.create(req.body);
            res.status(201).json({
                message: 'Expediente creado exitosamente',
                id: result.insertId
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el expediente' });
        }
    },

    // Obtener todos los expedientes
    getAll: async (req, res) => {
        try {
            const expedientes = await Expediente.findAll();
            res.json(expedientes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los expedientes' });
        }
    },

    // Obtener un expediente por ID
    getById: async (req, res) => {
        try {
            const expediente = await Expediente.findById(req.params.id);
            if (!expediente) {
                return res.status(404).json({ error: 'Expediente no encontrado' });
            }
            res.json(expediente);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el expediente' });
        }
    },

    // Actualizar un expediente
    update: async (req, res) => {
        try {
            const result = await Expediente.update(req.params.id, req.body);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Expediente no encontrado' });
            }
            res.json({ message: 'Expediente actualizado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el expediente' });
        }
    },

    // Eliminar un expediente
    delete: async (req, res) => {
        try {
            const result = await Expediente.delete(req.params.id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Expediente no encontrado' });
            }
            res.json({ message: 'Expediente eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el expediente' });
        }
    },

    // Buscar expedientes
    search: async (req, res) => {
        try {
            const { term } = req.query;
            const expedientes = await Expediente.search(term);
            res.json(expedientes);
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar expedientes' });
        }
    }
,
    // Buscar expedientes por tipo
    getByTipo: async (req, res) => {
        try {
            const { tipo } = req.params;
            const expedientes = await Expediente.searchByTipo(tipo);
            res.json(expedientes);
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar expedientes por tipo' });
        }
    }
};

module.exports = expedienteController;