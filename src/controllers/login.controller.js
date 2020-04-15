const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
const Usuario = require('../models/usuario');
const CLIENT_ID = require('../config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');//GOOGLE SIGN IN
const client = new OAuth2Client(CLIENT_ID);


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
        return res.status(500).json({ ok: false, mensaje: err });
    };

};




async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    };
}

const googleSignIn = async (req, res) => {
    const { token } = req.body
    try {
        const googleUser = await verify(token);
        const usuario = await Usuario.find({ email: googleUser.email });
        if (usuario.length > 0) {
            if (usuario.google === false) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Debe usar la autentificación con correo y contraseña'
                });
            } else {
                const token = await jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 });
                return res.json({
                    ok: true,
                    usuario: usuario,
                    token,
                    id: usuario._id
                });
            };

        } else {
            const newUsuario = new Usuario({
                nombre: googleUser.nombre,
                email: googleUser.email,
                img: googleUser.img,
                google: true,
                password: ':)'
            });
            await newUsuario.save();
            const token = await jwt.sign({ usuario: newUsuario }, SEED, { expiresIn: 14400 });
            return res.json({
                ok: true,
                usuario: newUsuario,
                token,
                id: newUsuario._id
            });
        };
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, message: error });
    };

};

module.exports = { login, googleSignIn };
