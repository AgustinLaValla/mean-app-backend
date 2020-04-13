const jwt = require('jsonwebtoken');
const SEED = require('../config/config');

// Verificar token
const verificaToken = async function (req, res, next) {

    const token = req.get('token');
    try {
        const decoded = await jwt.verify(token, SEED.SEED);
        req.usuario = decoded.usuario;
    } catch (err) {
        return res.status(401).json({ok:false, mensaje: err});
    };

    next();
};


module.exports = { verificaToken };


