const Medico = require('../models/medicos');

const getMedicos = async (req, res) => {
    const desde = Number(req.get('desde')) || 0;
    const paginate = Number(req.get('paginate')) || 5;
    try {
        const medicos = await Medico.find()
                                    .skip(desde)
                                    .limit(paginate)
                                    .populate('usuario', 'nombre email')
                                    .populate('hospital', 'nombre')
                                    .exec();
        const counter = await Medico.count({});
        return res.json({ ok: true, medicos, total: counter });
    } catch (error) {
        return res.status(500).json({ok:false, mensaje: error});
    };
};

const createMedico = async (req, res) => {
    const { nombre, hospital } = req.body;
    const img = req.body.img || ''
    const userId = req.usuario._id;

    const newMedico = new Medico({ nombre, img, usuario: userId, hospital });
    try {
        await newMedico.save();
        return res.json({ ok: true, mensaje: 'Médico Creado' });
    } catch (error) {
        return res.status(500).json({ ok: false, mensaje: error });
    };
};

const updateMedico = async (req,res) => {
    const { body } = req;
    const { id } = req.params;

    if(!body) return;
    const medicoExist = await Medico.findById(id);
    if(!medicoExist) return res.status(400).json({ok:false, mensaje: 'Medico no encontrado'});
    try {
        const medico = await Medico.findByIdAndUpdate(id, body, {new: true, runValidators:true});
        return res.json({ok:true, mensje:'Medico actualizado',medico})
    } catch (error) {
        return res.status(500).json({ok:false, mensaje: error});
    };
};

const deleteMedico = async (req ,res) => { 
    const { id } = req.params;
    const medicoExist = await Medico.findById(id);
    if(!medicoExist) return res.status(400).json({ok:false, mensaje:'Medico no encontrado'});
    try {
        await Medico.findByIdAndRemove(id);
        return res.json({ok:true, mensaje: 'Medico eliminado satisfactoriamente'});
    } catch (error) {
        return res.status(500).json({ok:false, mensaje:error});
    };
};

module.exports = { getMedicos, createMedico, updateMedico, deleteMedico };