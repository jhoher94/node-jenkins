const Usuario = require('../models/usuario')
const {request, response} = require('express')


//Creación

const createUsuario = async (req = request,
    res = response) => {
    try{
        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''

        const email = req.body.email
        ? req.body.email.toUpperCase()
        : ''

        const usuarioBD = await Usuario.findOne({nombre})
        if(usuarioBD){
            return res.status(400).json({msg: 'Ya existe'})
        }

        const data = {
            nombre,
            email
        }

        const usuario = new Usuario(data)

        await usuario.save()
        return res.status(201).json(usuario)

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de Usuario

const updateUsuario = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        data.fechaActualizacion = new Date()

        const usuario = await Usuario.findByIdAndUpdate(id,data, {new: true})

        if(!usuario) return res.json({msg: 'No hay datos'})
        
        return res.json({usuario})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getUsuarios = async (req = request,
    res = response, next) => {
    try{
        if(req.query.estado) return next();

        const usuario = await Usuario.find({})
        if(usuario.length == 0 )
        return res.json({msg: 'No hay datos'})
        return res.json({usuario})
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


//Buscar estadoquipo por estado:

const getUsuarioEstado = async (req = request, res = response) => {
    try{
        const { estado } = req.query;


        const usuario = await Usuario.find({estado})

        if(!usuario) return res.json({msg: 'No hay datos'})
        return res.json(usuario)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Eliminar usuarios

const deleteUsuario = async ( req = request, res = response) => {
    try{
        const { id } = req.query

        const usuario = await Usuario.findById(id)

        if(usuario){
            const usuarioDBfound = await Usuario.findByIdAndDelete(id)
            return res.json({msg: 'El usuario fue eliminado con exito'})
        }
        if(!usuario){
            return res.json({msg: 'No existe ese id'})
        } 
        

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}



module.exports = {createUsuario, getUsuarios, getUsuarioEstado, updateUsuario, deleteUsuario}
