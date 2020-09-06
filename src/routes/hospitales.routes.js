const { Router } = require('express');
const { getHospitales, createHospital, updateHospital, deleteHospital, getHospital, getHospitalesCounter } = require('../controllers/hospitales.controllers');
const { verificaToken } = require('../middlewares/autenticacion');

const router = Router();

router.get('/', getHospitales);

router.get('/:id', getHospital)

router.get('/collection-data/counter', getHospitalesCounter);

router.post('/', verificaToken, createHospital);

router.put('/:id', verificaToken, updateHospital);

router.delete('/:id', verificaToken, deleteHospital);

module.exports = router;