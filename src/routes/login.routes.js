const { Router } = require('express');
const router = Router();
const { login, googleSignIn } = require('../controllers/login.controller');

//Google Sign In
router.post('/google', googleSignIn);

//Normal login
router.post('/', login);


module.exports = router;