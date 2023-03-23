const Inventario = require('../models/inventario')
const { request, response} = require('express')
const Usuario = require('../models/usuario')
const Marca = require('../models/marca')
const EstadoEquipo = require('../models/estadoEquipo')
const TipoEquipo = require('../models/tipoEquipo')

// crear
const createInventario= async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log(data)
        const { usuario, marca, estadoEquipo, tipoEquipo } = data;
        //validando usuario
        const usuarioDB = await Usuario.findOne({
            _id: usuario._id,
            estado: true
        })
        if(!usuarioDB){
            return res.status(400).json({msg: 'usuario invalido'})
        }
        // validando marca
        const marcaDB = await Marca.findOne({
            _id: marca._id,
            estado: true
        })// select * from marcas where _id=? and estado=true
        if(!marcaDB){
            return res.status(400).json({msg: 'marca invalida'})
        }
        // validando estado de equipo
        const estadoEquipoDB = await EstadoEquipo.findOne({
            _id: estadoEquipo._id,
            estado: true
        })// select * from estados where _id=? and estado=true
        if(!estadoEquipoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }
        // validando tipo equipo
        const tipoEquipoDB = await TipoEquipo.findOne({
            _id: tipoEquipo._id,
            estado: true
        })// select * from tipoequipos where _id=? and estado=true
        if(!tipoEquipoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }      
        const inventario = new Inventario(data)

        await inventario.save()
        
        return res.status(201).json(inventario)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getInventarios = async (req = request, 
    res = response) => {
        try{
            const inventariosDB = await Inventario.find()
            return res.json(inventariosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}


//obtener inventarios por estado

const getInventarioEstado = async (req = request, res = response) => {
    try{
        const { estado } = req.query;


        const inventarioDB = await Inventario.find({estado})

        if(!inventarioDB) return res.json({msg: 'No hay datos'})
        return res.json(inventarioDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


const updateInventario = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        const { usuario, marca, estadoEquipo, tipoEquipo} = data;

        //validando usuario
        const usuarioDB = await Usuario.findOne({
            _id: usuario._id,
            estado: true
        })
        if(!usuarioDB){
            return res.status(400).json({msg: 'usuario invalido'})
        }
        // validando marca
        const marcaDB = await Marca.findOne({
            _id: marca._id,
            estado: true
        })
        if(!marcaDB){
            return res.status(400).json({msg: 'marca invalida'})
        }
        // validando estado de equipo
        const estadoEquipoDB = await EstadoEquipo.findOne({
            _id: estadoEquipo._id,
            estado: true
        })
        if(!estadoEquipoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }
        // validando tipo equipo
        const tipoEquipoDB = await TipoEquipo.findOne({
            _id: tipoEquipo._id,
            estado: true
        })
        if(!tipoEquipoDB){
           return res.status(400).json({msg: 'tipo de equipo invalido'})
        }      

        const inventarioDB = await Inventario.findByIdAndUpdate(id,data, {new: true})

        if(!inventarioDB) return res.json({msg: 'No hay datos'})
        
        return res.json({inventarioDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Eliminar marca

const deleteInventario = async ( req = request, res = response) => {
    try{
        const { id } = req.query

        const inventarioDB = await Inventario.findById(id)

        if(inventarioDB){
            const inventarioDBfound = await Marca.findByIdAndDelete(id)
            return res.json({msg: 'El inventario fue eliminado con exito'})
        }
        if(!inventarioDB){
            return res.json({msg: 'No existe ese id'})
        } 
        

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}




module.exports = { createInventario, getInventarios, getInventarioEstado, updateInventario, deleteInventario }