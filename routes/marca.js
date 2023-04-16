const { Router } = require('express')
const { createMarca, getMarcas, getMarcaEstado, updateMarca, deleteMarca} = require('../controllers/marca')


const router = Router()


// crear
router.post('/', createMarca)

// editar Marca
router.put('/', updateMarca)

// listar
router.get('/', getMarcas)

//Listar por estado
router.get('/', getMarcaEstado)

//Eliminar Marca

router.delete('/', deleteMarca)

module.exports = router
