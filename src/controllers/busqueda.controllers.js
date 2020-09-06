const Hospital = require('../models/hospital');
const Medico = require('../models/medicos')
const Usuario = require('../models/usuario');


// General Search
const getGlobalBusqueda = async (req, res) => {
    const { busqueda } = req.params;
    const regex = new RegExp(busqueda, 'i');

    Promise.all([buscarHospitales(regex),
    buscarMedicos(regex),
    buscarUsuarios(regex)
    ])
        .then(respuestas => {
            res.status(200).json({
                ok: true,
                hospitales: respuestas[0],
                medicos: respuestas[1],
                usuarios: respuestas[2]
            })
        });

};

async function buscarHospitales(regex) {
    try {
        const resultados = await Hospital.find({ nombre: regex });
        return resultados;
    } catch (error) {
        return ('Error al cargar Hospitales', error);
    };
};

async function buscarMedicos(regex) {
    try {
        const resultados = await Medico.find({ nombre: regex }).populate('hospital', 'nombre');
        return resultados;
    } catch (error) {
        return ('Error al cargar Medicos', error);
    };
};

async function buscarUsuarios(regex) {
    try {
        const resultados = await Usuario.find({}, 'nombre email role img')
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec();
        return resultados;
    } catch (error) {
        return ('Error al cargar Usuarios', error);
    };
};



//Search by collection: Hospitales
const getHospitalesBusqueda = async (req, res) => {
    const { tabla, busqueda } = req.params;
    const regexp = new RegExp(busqueda, 'i');
    let promesa;
    switch (tabla) {
        case 'medicos':
            promesa = buscarMedicos(regexp);
            break;
        case 'hospitales':
            promesa = buscarHospitales(regexp);
            break;
        case 'usuarios':
            promesa = buscarUsuarios(regexp);
            break;
        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de búsqueda son: "medicos", "hospitales" y "usuarios"',
                error: { message: 'Tabla/Collección no válido' }
            });
    };
    promesa.then(busqueda => res.json({ ok: true, [tabla]: busqueda }))
        .catch(err => res.status(500).json({ ok: false, mensaje: err }));

};


module.exports = { getGlobalBusqueda, getHospitalesBusqueda };
