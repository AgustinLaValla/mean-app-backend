const { Router } = require('express');
const router = Router();
const { getGlobalBusqueda, getHospitalesBusqueda } = require('../controllers/busqueda.controllers');

router.get('/:todo/:busqueda', getGlobalBusqueda);
router.get('/coleccion/:tabla/:busqueda', getHospitalesBusqueda)

module.exports = router;