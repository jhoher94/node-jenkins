const Marca = require('../models/marca')
const {request, response} = require('express')


//Creación

const createMarca = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const marcaBD = await Marca.findOne({nombre})
        if(marcaBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const marca = new Marca(data)
        await marca.save()
        return res.status(201).json(marca)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de marca

const updateMarca = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        data.fechaActualizacion = new Date()

        const marcaDB = await Marca.findByIdAndUpdate(id,data, {new: true})

        if(!marcaDB) return res.json({msg: 'No hay datos'})
        
        return res.json({marcaDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getMarcas = async (req = request,
    res = response,next) => {
    try{

        if(req.query.estado) return next();

        const marcaDB = await Marca.find({})
        if(marcaDB.length == 0 )
        return res.json({msg: 'No hay datos'})
        return res.json({marcaDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


//Buscar marca por estado:

const getMarcaEstado = async (req = request, res = response) => {
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
}

module.exports = {createMarca,getMarcas, getMarcaEstado, updateMarca, deleteMarca}



