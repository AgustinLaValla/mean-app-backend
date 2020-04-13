const { Schema, model } = require('mongoose');

const medicoSchema = new Schema({
    nombre: { type:String, required:[true, 'El nombre es necesario'] },
    img: { type:String, required:false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required:true },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required:[true, 'Este campo es obligatorio'] }
});

module.exports = model('Medico', medicoSchema);