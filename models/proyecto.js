const { Schema, model } = require('mongoose')


const ProyectoSchema = Schema({
    numero: {
        type: String,
        required: [true, 'numero requerido'],
        unique: [true, 'Proyecto en uso']
    },
    titulo: {
        type: String
    },
    fechaIniciacion:{
        type: Date
    },
    fechaEntrega:{
        type: Date
    },
    valor:{
        type: String
    },
    fechaCreacion:{
        type: Date,
        default: new Date()
    },
    fechaActualizacion:{
        type: Date,
        default: new Date()
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    tipoProyecto:{
        type: Schema.Types.ObjectId,
        ref: 'tipoProyecto',
        required: true
    },
    universidad:{
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required: true
    },
    etapa:{
        type: Schema.Types.ObjectId,
        ref: 'etapa',
        required: true
    },
})


module.exports = model('Proyecto', ProyectoSchema)

