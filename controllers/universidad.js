const Universidad = require('../models/universidad')
const {request, response} = require('express')


//Creación

const createUniversidad = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        const nombre = req.body.nombre
        const direccion = req.body.direccion
        const telefono = req.body.telefono
        ? req.body.nombre.toUpperCase()
        : ''
        ? req.body.direccion.toUpperCase()
        : ''
        ? req.body.telefono.toUpperCase()
        : ''
        const universidadBD = await Universidad.findOne({nombre})
        if(universidadBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre,
            direccion,
            telefono
        }
        const universidad = new Universidad(data)
        await universidad.save()
        return res.status(201).json(universidad)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de universidad

const updateUniversidad = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        data.fechaActualizacion = new Date()

        const universidadBD = await Universidad.findByIdAndUpdate(id,data, {new: true})

        if(!universidadBD) return res.json({msg: 'No hay datos'})
        
        return res.json({universidadBD})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getUniversidades = async (req = request,
    res = response,next) => {
    try{

        if(req.query.estado) return next();

        const universidadesBD = await Universidad.find({})
        if(universidadesBD.length == 0 )
        return res.json({msg: 'No hay datos'})
        return res.json({universidadesBD})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


//Buscar marca por estado:

/*   const getMarcaEstado = async (req = request, res = response) => {
    try{
        const { estado } = req.query;


        const marcaDB = await Marca.find({estado})

        if(!marcaDB) return res.json({msg: 'No hay datos'})
        return res.json(marcaDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Eliminar marca

const deleteMarca = async ( req = request, res = response) => {
    try{
        const { id } = req.query

        const marcaDB = await Marca.findById(id)

        if(marcaDB){
            const marcaDBfound = await Marca.findByIdAndDelete(id)
            return res.json({msg: 'La marca fue eliminado con exito'})
        }
        if(!marcaDB){
            return res.json({msg: 'No existe ese id'})
        } 
        

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}  */

module.exports = {createUniversidad,getUniversidades,updateUniversidad /* getMarcaEstado, , deleteMarca */ }



