const { Router } = require('express')
const { createUsuario, getUsuarios, getUsuarioEstado, updateUsuario, deleteUsuario} = require('../controllers/usuario')


const router = Router()


// crear
router.post('/', createUsuario)

// editar Usuario
router.put('/', updateUsuario)

// listar
router.get('/', getUsuarios)

//Listar por estado
router.get('/', getUsuarioEstado)

//Eliminar Usuario

router.delete('/', deleteUsuario)

module.exports = router