const { Router } = require('express');
const { getUsers, updateUser, createUser, deleteUser } = require('../controllers/usuario.controller');
const { verificaToken } = require('../middlewares/autenticacion');

const router = Router();

// Obtener todos los usuarios
router.get('/', getUsers);

// Crear usuario
router.post('/', verificaToken, createUser);

//Actualizar usuario
router.put('/:id', updateUser );

// Borrar un usuario por el id
router.delete('/:id', deleteUser);

module.exports = router;