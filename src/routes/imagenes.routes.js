const { Router } = require('express');
const { getImage } = require('../controllers/imagenes.controller');

const router = Router();

router.get('/:tipo/:img', getImage);

module.exports = router;