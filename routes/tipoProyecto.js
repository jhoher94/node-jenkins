const { Router } = require('express')
const { createTipoProyecto, getTipoProyecto, updateTipoProyecto, /* getEstadoEquipoEstado, , deleteEstadoEquipo */ 
getTipoProyectos} = require('../controllers/tipoProyecto')


const router = Router()


// crear
router.post('/', createTipoProyecto)

// editar EstadoEquipo
router.put('/', updateTipoProyecto)

// listar
router.get('/', getTipoProyectos)

/*  //Listar por estado
router.get('/', getEstadoEquipoEstado)

//Eliminar Estadoequipo

router.delete('/', deleteEstadoEquipo) */

module.exports = router
