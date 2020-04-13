const Hospital = require('../models/hospital');

const getHospitales = async (req, res) => {
    const desde = Number(req.get('desde')) || 0;
    const paginate = Number(req.get('paginate')) || 5;
    try {
        const hospitales = await Hospital.find()
                                         .skip(desde)
                                         .limit(paginate)
                                         .populate('usuario', 'nombre, email')
                                         .exec();
        const counter = await Hospital.count({});
        return res.json({ ok: true, hospitales, total:counter });
    } catch (err) {
        return res.status(500).json({ ok: false, mensaje: err });
    };
};

const createHospital = async (req, res) => {
    const { nombre } = req.body;
    const userId = req.usuario._id;
    const img = req.body.img || '';


    const newHospital = new Hospital({ nombre, usuario: userId, img });
    try {
        await newHospital.save();
        return res.json({ ok: true, mensaje: 'Hospital exitosamente creado', hospital: newHospital });
    } catch (err) {
        return res.status(500).json({ ok: false, mensaje: err });
    };
};

const updateHospital = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    if (!body) return;

    const hospital = await Hospital.findById(id);
    if (!hospital) return res.status(400).json({ ok: false, mensaje: 'Hospital no encontrado' });

    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        return res.json({ ok: true, hospital: updatedHospital });
    } catch (err) {
        return res.status(500).json({ok:false, mensaje: err});
    };
};

const deleteHospital = async (req, res) => {
    const { id } = req.params;
    const hospitalExist = await Hospital.findById(id);
    if(!hospitalExist) return res.status(400).json({ok:false, mensaje: 'Hospital no encontrado'});
    try {
        await Hospital.findByIdAndDelete(id);
        return res.json({ok:true, mensaje: 'Hospital eliminado'});
    } catch (err) {
        return res.status(500).json({ok:false, mensaje:err});
    };
};

module.exports = { getHospitales, createHospital, updateHospital, deleteHospital };