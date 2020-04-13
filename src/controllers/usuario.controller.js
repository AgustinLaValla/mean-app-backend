const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const getUsers = async (req, res) => {

    const desde = Number(req.get('desde')) || 0;
    const paginate = Number(req.get('paginate')) || 5;

    try {
        usuarios = await Usuario.find({}, 'nombre email img role').skip(desde).limit(paginate).exec();
        if (!usuarios) return res.status(400).json({ ok: false, message: 'Usuario no encontrado' });
        const counter = await Usuario.count();
        return res.status(200).json({ ok: true, usuarios: usuarios, total:counter });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: 'Error al cargar usuarios',
            errors: err
        });
    };
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, role } = req.body;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(400).json({ ok: false, mensaje: `El usuario no existe` });
        };

        usuario.nombre = nombre;
        usuario.email = email;
        usuario.role = role;

        await usuario.save();
        usuario.password = ':)';

        return res.status(200).json({ ok: true, usuario });

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            ok: false,
            mensaje: err
        });
    };
};


const createUser = async (req, res) => {
    const { body } = req;

    const usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    try {
        await usuario.save();
        return res.status(201).json({ ok: true, usuario, usuarioToken: req['usuario'] });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ ok: false, mensaje: err });
    };

};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);
    if (!usuario) return res.status(400).json({ ok: false, mensaje: 'El usuario no existe' });

    await Usuario.findByIdAndRemove(id);
    return res.status(200).json({ ok: true, mensaje: 'Usuario borrado con éxito', usuario });
}

module.exports = { getUsers, updateUser, createUser, deleteUser };
