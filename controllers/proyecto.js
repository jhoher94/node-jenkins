const Proyecto = require('../models/proyecto')
const { request, response} = require('express')
const Cliente = require('../models/cliente')
const Universidad = require('../models/universidad')
const TipoProyecto = require('../models/tipoProyecto')
const Etapa = require('../models/etapa')


// crear
const createProyecto= async (req = request, 
    res = response) => {
    try{
        const data = req.body
        console.log("data", data)
        const { cliente, universidad, tipoProyecto , etapa } = data;
        //validando cliente
        const clienteDB = await Cliente.findOne({
            _id: cliente._id,
            estado: true
        })

        console.log("cliente:", clienteDB)

        if(!clienteDB){
            return res.status(400).json({msg: 'cliente invalido'})
        }
        // validando universidad
        const universidadDB = await Universidad.findOne({
            _id: universidad._id,
            estado: true
        })// select * from universidades where _id=? and estado=true
        if(!universidadDB){
            return res.status(400).json({msg: 'universidad invalida'})
        }

            
        

        // validando tipo de proyecto
        const tipoProyectoDB = await TipoProyecto.findOne({
            _id: tipoProyecto._id,
            estado: true
        })// select * from estados where _id=? and estado=true

        if(!tipoProyectoDB){
           return res.status(400).json({msg: 'tipo invalido'})
        }
     
        
        console.log("tipoProyecto: ", tipoProyectoDB)
    
        // validando etapa
        
        const etapaDB = await Etapa.findOne({
            _id: etapa._id,
            estado: true
        })// select * from etapas where _id=? and estado=true
        if(!etapaDB){
           return res.status(400).json({msg: 'etapa invalida'})
        }      

        
        console.log("etapa:", etapaDB)

        const proyecto = new Proyecto(data)

        await proyecto.save()
        
        return res.status(201).json(proyecto)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

//listar todos
const getProyectos = async (req = request, 
    res = response) => {
        try{
            const proyectosDB = await Proyecto.find()
            return res.json(proyectosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}


// //obtener proyectos por estado

// const getInventarioEstado = async (req = request, res = response) => {
//     try{
//         const { estado } = req.query;


//         const inventarioDB = await Inventario.find({estado})

//         if(!inventarioDB) return res.json({msg: 'No hay datos'})
//         return res.json(inventarioDB)
//     }catch(e){
//         return res.status(500).json({
//             msg: e
//         })
//     }
// }


const updateProyecto = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body
        const { cliente, universidad, tipoProyecto, etapa} = data;

         console.log ("data", data)
        //validando cliente
        const clienteDB = await Cliente.findOne({
            _id: cliente._id,
            estado: true
        })

        console.log ("cliente: ", clienteDB)


        if(!clienteDB){
            return res.status(400).json({msg: 'cliente invalido'})
        }

        

        // validando universidad
        const universidadDB = await Universidad.findOne({
            _id: universidad._id,
            estado: true
        })

        console.log ("universidad: ", universidadDB)

        if(!universidadDB){
            return res.status(400).json({msg: 'universidad invalida'})
        }

        

        // validando tipo proyecto
        const tipoProyectoDB = await TipoProyecto.findOne({
            _id: tipoProyecto._id,
            estado: true
        })

        console.log ("tipoProyecto", tipoProyectoDB)

        if(!tipoProyectoDB){
           return res.status(400).json({msg: 'tipo invalido'})
        }

        

        // validando etapa
        const etapaDB = await Etapa.findOne({
            _id: etapa._id,
            estado: true
        })

        console.log ("etapa: ", etapaDB)

        if(!etapaDB){
           return res.status(400).json({msg: 'etapa invalida'})
        }
        

        const proyectoDB = await Proyecto.findByIdAndUpdate(id,data, {new: true})

        if(!proyectoDB) return res.json({msg: 'No hay datos'})
        
        return res.json({proyectoDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

// //Eliminar inventario

// const deleteInventario = async ( req = request, res = response) => {
//     try{
//         const { id } = req.query

//         const inventarioDB = await Inventario.findById(id)

//         if(inventarioDB){
//             const inventarioDBfound = await Inventario.findByIdAndDelete(id)
//             return res.json({msg: 'El inventario fue eliminado con exito'})
//         }
//         if(!inventarioDB){
//             return res.json({msg: 'No existe ese id'})
//         } 
        

//     }catch(e){
//         return res.status(500).json({
//             msg: e
//         })
//     }
// }




module.exports = { createProyecto, getProyectos, /*getInventarioEstado*/ updateProyecto, /*deleteInventario*/ }