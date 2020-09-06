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

const verificaAdmin = (req, res, next) => {
    if(req.usuario.role === 'ADMIN_ROLE') next();
    else return res.status(400).json({ ok: false, message: 'Forbbiden' });
}

const verificaUserOrAdmin = (req, res, next) => {
    const { id } = req.params;
    if(req.usuario.role === 'ADMIN_ROLE' || req.usuario._id === id) next();
    else return res.status(400).json({ ok: false, message: 'Forbbiden', error:{message: 'Not the same user'} });
}

module.exports = { verificaToken, verificaAdmin, verificaUserOrAdmin };


