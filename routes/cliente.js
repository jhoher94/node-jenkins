const { Router } = require('express')
const { createCliente, getClientes, /*getUsuarioEstado*/ updateCliente, /*deleteUsuario*/} = require('../controllers/cliente')


const router = Router()


// crear
router.post('/', createCliente)

// editar Usuario
router.put('/', updateCliente)

// listar
router.get('/', getClientes)

/*//Listar por estado
router.get('/', getUsuarioEstado)

//Eliminar Usuario

router.delete('/', deleteUsuario)*/

module.exports = router