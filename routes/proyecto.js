const { Router } = require('express')
const { createProyecto, getProyectos,  updateProyecto, } = require('../controllers/proyecto')


const router = Router()


// crear
router.post('/', createProyecto)

// editar Proyecto
router.put('/', updateProyecto)

// listar
router.get('/', getProyectos)

module.exports = router
