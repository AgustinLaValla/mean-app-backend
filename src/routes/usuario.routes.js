const { Router } = require('express');
const { getUsers, updateUser, createUser, deleteUser } = require('../controllers/usuario.controller');
const { verificaToken, verificaAdmin, verificaUserOrAdmin} = require('../middlewares/autenticacion');

const router = Router();

// Obtener todos los usuarios
router.get('/', [verificaToken, verificaAdmin],getUsers);

// Crear usuario
router.post('/', /*verificaToken,*/ createUser);

//Actualizar usuario
router.put('/:id', [verificaToken, verificaToken, verificaUserOrAdmin],updateUser );

// Borrar un usuario por el id
router.delete('/:id', [verificaToken, verificaAdmin],deleteUser);

module.exports = router;