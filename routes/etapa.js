const { Router } = require('express')
const { createEtapa, getEtapas,updateEtapa /* getTipoEquipoEstado, , deleteTipoEquipo */ } = require('../controllers/etapa')


const router = Router()


// crear
router.post('/', createEtapa)

// editar tipoEquipo
router.put('/', updateEtapa)

// listar
router.get('/', getEtapas)

/*   //Listar por estado
router.get('/', getTipoEquipoEstado)

//Eliminar Tipoequipo

router.delete('/', deleteTipoEquipo)  */

module.exports = router
