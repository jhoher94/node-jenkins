const { Router } = require('express')
const { createTipoEquipo, getTipoEquipos, getTipoEquipoEstado, updateTipoEquipo, deleteTipoEquipo} = require('../controllers/tipoEquipo')


const router = Router()


// crear
router.post('/', createTipoEquipo)

// editar tipoEquipo
router.put('/', updateTipoEquipo)

// listar
router.get('/', getTipoEquipos)

//Listar por estado
router.get('/', getTipoEquipoEstado)

//Eliminar Tipoequipo

router.delete('/', deleteTipoEquipo)

module.exports = router
