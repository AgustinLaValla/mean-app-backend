const { Router } = require('express');
const { getHospitales, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitales.controllers');
const { verificaToken } = require('../middlewares/autenticacion');

const router = Router();

router.get('/', getHospitales);

router.post('/', verificaToken, createHospital);

router.put('/:id', verificaToken, updateHospital);

router.delete('/:id', verificaToken, deleteHospital);

module.exports = router;