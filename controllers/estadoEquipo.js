const EstadoEquipo = require('../models/estadoEquipo')
const {request, response} = require('express')


//Creación

const createEstadoEquipo = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const estadoEquipoBD = await EstadoEquipo.findOne({nombre})
        if(estadoEquipoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const estadoEquipo = new EstadoEquipo(data)
        //console.log(EstadoEquipo)
        await estadoEquipo.save()
        return res.status(201).json(estadoEquipo)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de estadoequipo

const updateEstadoEquipo = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        data.fechaActualizacion = new Date()

        const estadoEquiposDB = await EstadoEquipo.findByIdAndUpdate(id,data, {new: true})

        if(!estadoEquiposDB) return res.json({msg: 'No hay datos'})
        
        return res.json({estadoEquiposDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getEstadoEquipos = async (req = request,
    res = response) => {
    try{
        const estadoEquiposDB = await EstadoEquipo.find({})
        if(estadoEquiposDB.length == 0 )
        return res.json({msg: 'No hay datos'})
        return res.json({estadoEquiposDB})
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


//Buscar estadoquipo por estado:

const getEstadoEquipoEstado = async (req = request, res = response) => {
    try{
        const { estado } = req.query;


        const estadoEquiposDB = await EstadoEquipo.find({estado})

        if(!estadoEquiposDB) return res.json({msg: 'No hay datos'})
        return res.json(estadoEquiposDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Eliminar estadoequipo

const deleteEstadoEquipo = async ( req = request, res = response) => {
    try{
        const { id } = req.query

        const estadoEquiposDB = await EstadoEquipo.findById(id)

        if(estadoEquiposDB){
            const estadoEquiposDBfound = await EstadoEquipo.findByIdAndDelete(id)
            return res.json({msg: 'El estado de equipo fue eliminado con exito'})
        }
        if(!estadoEquiposDB){
            return res.json({msg: 'No existe ese id'})
        } 
        

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}





module.exports = {createEstadoEquipo, getEstadoEquipos, getEstadoEquipoEstado, updateEstadoEquipo, deleteEstadoEquipo}
