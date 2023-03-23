const TipoEquipo = require('../models/tipoEquipo')
const {request, response} = require('express')


//Creación

const createTipoEquipo = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const tipoEquipoBD = await TipoEquipo.findOne({nombre})
        if(tipoEquipoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const tipoEquipo = new TipoEquipo(data)
        //console.log(tipoEquipo)
        await tipoEquipo.save()
        return res.status(201).json(tipoEquipo)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de tipoequipo

const updateTipoEquipo = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        data.fechaActualizacion = new Date()

        const tipoEquiposDB = await TipoEquipo.findByIdAndUpdate(id,data, {new: true})

        if(!tipoEquiposDB) return res.json({msg: 'No hay datos'})
        
        return res.json({tipoEquiposDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getTipoEquipos = async (req = request,
    res = response) => {
    try{
        //const { estado } = req.query;


        const tipoEquiposDB = await TipoEquipo.find({})
        if(tipoEquiposDB.length == 0 )
        return res.json({msg: 'No hay datos'})
        //select * from tipoequipo where estado = ?;
        return res.json({tipoEquiposDB})
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


//Buscar tipoquipo por estado:

const getTipoEquipoEstado = async (req = request, res = response) => {
    try{
        const { estado } = req.query;


        const tipoEquiposDB = await TipoEquipo.find({estado})

        if(!tipoEquiposDB) return res.json({msg: 'No hay datos'})
        return res.json(tipoEquiposDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Eliminar tipoequipo

const deleteTipoEquipo = async ( req = request, res = response) => {
    try{
        const { id } = req.query

        const tipoEquiposDB = await TipoEquipo.findById(id)

        if(tipoEquiposDB){
            const tipoEquiposDBfound = await TipoEquipo.findByIdAndDelete(id)
            return res.json({msg: 'El tipo de equipo fue eliminado con exito'})
        }
        if(!tipoEquiposDB){
            return res.json({msg: 'No existe ese id'})
        } 
        

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}





module.exports = {createTipoEquipo, getTipoEquipos, getTipoEquipoEstado, updateTipoEquipo, deleteTipoEquipo}
