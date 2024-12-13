// routes/activoFijoRoutes.js
const express = require('express');
const activoFijoController = require('../controllers/activoFijoController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para obtener todos los activos fijos
router.get('/', authenticateToken, activoFijoController.getActivosFijos);

// Ruta para obtener un activo fijo por ID
router.get('/:id', authenticateToken, activoFijoController.getActivoFijoById);

// Ruta para crear un activo fijo
router.post('/', authenticateToken, activoFijoController.createActivoFijo);

// Ruta para actualizar un activo fijo
router.put('/:id', authenticateToken, activoFijoController.updateActivoFijo);

// Ruta para eliminar un activo fijo
router.delete('/:id', authenticateToken, activoFijoController.deleteActivoFijo);

module.exports = router;