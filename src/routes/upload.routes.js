const { Router } = require('express');
const fileUpload = require('express-fileupload');
const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');
const fs = require('fs');

const router = Router();

router.use(fileUpload({ useTempFiles: true }));

router.put('/:tipo/:id', (req, res) => {
    const { tipo, id } = req.params;

    //tipos de colecciones
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no valida',
            errors: { message: 'Tipo de colleción no válida' }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No hay una imagen seleccionada',
            error: 'Debe seleccionar una imagen'
        });
    };
    //Extensiones válidas: Array with valid extensions
    const extensionesValidas = ['jpg', 'png', 'gif', 'jpeg'];

    //Obtener nombre del archivo
    const archivo = req.files.imagen;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    //Validación de la extensión del archivo: File extension Validation
    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensión no válida',
            error: { message: 'Extensiones válidas: ' + extension.join(', ') }
        });
    };

    //Nombre de archivo personalizado
    const nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    //Mover el archivo del temporal a una dirección particular
    const path = `./src/uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al mover archivo',
                error: err
            });
        };

        subirPorTipo(tipo, id, nombreArchivo, res);
    });
});

async function subirPorTipo(tipo, id, nombreArchivo, res) {
    if (tipo === 'usuarios') {

        const usuario = await Usuario.findById(id);
        if (!usuario) return res.status(400).json({ ok: false, message: 'Usuario no encontrado' });
        const oldPath = './src/uploads/usuarios/' + usuario.img;
        console.log(oldPath);
        if (fs.existsSync(oldPath)) {  //Si existe elimina la imagen anterior 
            fs.unlinkSync(oldPath);
        };

        usuario.img = nombreArchivo;
        const usuarioActualizado = await usuario.save();
        return res.json({ ok: true, mensaje: 'Imagen de usuario actualizada', usuario: usuarioActualizado })

    };

    if (tipo === 'medicos') {
        const medico = await Medico.findById(id);
        if (!medico) return res.status(400).json({ ok: false, message: 'Médico no encontrado' });
        const oldPath = medico.img ? './src/uploads/medicos/' + medico.img : null;
        console.log(oldPath, medico);
        if (oldPath && fs.existsSync(oldPath)) {  //Si existe elimina la imagen anterior 
            fs.unlinkSync(oldPath);
        };


        medico.img = nombreArchivo;
        const medicoActualizado = await medico.save();
        return res.json({ ok: true, mensaje: 'Imagen de medico actualizada', medico: medicoActualizado })
    };

    if (tipo === 'hospitales') {

        const hospital = await Hospital.findById(id);
        if (!hospital) return res.status(400).json({ ok: false, message: 'Hospital no encontrado' });
        const oldPath = hospital.img ? './src/uploads/hospitales/' + hospital.img : null;
        if (fs.existsSync(oldPath)) {  //Si existe elimina la imagen anterior 
            fs.unlinkSync(oldPath);
        };

        hospital.img = nombreArchivo;
        const hospitalActualizado = await hospital.save();
        return res.json({ ok: true, mensaje: 'Imagen de hospital actualizada', hospital: hospitalActualizado })
    };
};

module.exports = router;