const { Router } = require('express')
const { createInventario, getInventarios, getInventarioEstado, updateInventario, deleteInventario} = require('../controllers/Inventario')


const router = Router()


// crear
router.post('/', createInventario)

// editar Inventario
router.put('/', updateInventario)

// listar
router.get('/', getInventarios)

//Listar por estado
router.get('/', getInventarioEstado)

//Eliminar Inventario

router.delete('/', deleteInventario)

module.exports = router
