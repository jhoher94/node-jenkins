const { Router } = require('express')
const { createEstadoEquipo, getEstadoEquipos, getEstadoEquipoEstado, updateEstadoEquipo, deleteEstadoEquipo} = require('../controllers/EstadoEquipo')


const router = Router()


// crear
router.post('/', createEstadoEquipo)

// editar EstadoEquipo
router.put('/', updateEstadoEquipo)

// listar
router.get('/', getEstadoEquipos)

//Listar por estado
router.get('/', getEstadoEquipoEstado)

//Eliminar Estadoequipo

router.delete('/', deleteEstadoEquipo)

module.exports = router
