const express = require('express');
const router = express.Router();
const expedienteController = require('../controllers/expedienteController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Middleware para verificar rol de admin
const isAdmin = checkRole(['admin']);

// Rutas protegidas que requieren autenticación y rol de admin
router.post('/', auth, isAdmin, expedienteController.create);
router.get('/', auth, expedienteController.getAll);
router.get('/search', auth, expedienteController.search);
router.get('/:id', auth, expedienteController.getById);
router.put('/:id', auth, isAdmin, expedienteController.update);
router.delete('/:id', auth, isAdmin, expedienteController.delete);

// Ruta para buscar por tipo de expediente
router.get('/tipo/:tipo', auth, expedienteController.getByTipo);

module.exports = router;