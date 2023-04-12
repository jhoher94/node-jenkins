const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')


// middlewares
app.use(cors({origin:'*'}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


const tipoEquipo = require('./routes/tipoEquipo')
const estadoEquipo = require('./routes/estadoEquipo')
const usuario = require('./routes/usuario')
const marca = require('./routes/marca')
const inventario = require('./routes/inventario')


// URI o endpoint
app.use('/api/tipoequipos', tipoEquipo)
app.use('/api/estadoequipos', estadoEquipo)
app.use('/api/usuarios', usuario)
app.use('/api/marcas', marca)
app.use('/api/inventarios', inventario)

module.exports = app

