const { Router } = require('express');
const { getMedicos, createMedico, updateMedico, deleteMedico } = require('../controllers/medicos.controllers');
const { verificaToken } = require('../middlewares/autenticacion');

const router = Router();

router.get('/', getMedicos);

router.post('/', verificaToken ,createMedico);

router.put('/:id', verificaToken, updateMedico);

router.delete('/:id', verificaToken, deleteMedico);

module.exports =  router;