const { Router } = require('express')
const { createUniversidad, getUniversidad,updateUniversidad /* getMarcaEstado, , deleteMarca */ } = require('../controllers/universidad')


const router = Router()


// crear
router.post('/', createUniversidad)

// editar Marca
router.put('/', updateUniversidad)

// listar
router.get('/', getUniversidad)

/*   //Listar por estado
router.get('/', getMarcaEstado)

//Eliminar Marca

router.delete('/', deleteMarca)   */

module.exports = router
