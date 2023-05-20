const { Router } = require('express')
const { createProyecto, getProyectos, /*getInventarioEstado*/ updateProyecto, /*deleteInventario*/} = require('../controllers/proyecto')


const router = Router()


// crear
router.post('/', createProyecto)

// editar Proyecto
router.put('/', updateProyecto)

// listar
router.get('/', getProyectos)

// //Listar por estado
// router.get('/', getInventarioEstado)

// //Eliminar Inventario

// router.delete('/', deleteInventario)

module.exports = router
