const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
const Usuario = require('../models/usuario');

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json(({ ok: false, message: 'Credenciales incorrectas - email' }));
        };

        if (!bcrypt.compareSync(password, usuario.password)) {
            return res.status(400).json({ ok: false, message: 'Credenciales incorrectas - password' });
        };

        //Crear token!!
        usuario.password = ':)';
        const token = await jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 }); //horas
        return res.status(200).json({ ok: true, usuario, token, id: usuario._id });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ok:false, mensaje:err});
    };

};

module.exports = { login }
