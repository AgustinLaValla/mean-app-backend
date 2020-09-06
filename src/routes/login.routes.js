const { Router } = require('express');
const router = Router();
const { login, googleSignIn, renovarToken } = require('../controllers/login.controller');
const { verificaToken } = require('../middlewares/autenticacion');

router.get('/renuevaToken', verificaToken, renovarToken);

//Google Sign In
router.post('/google', googleSignIn);

//Normal login
router.post('/', login);


module.exports = router;