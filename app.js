const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')


// middlewares
app.use(cors({origin:'*'}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


const tipoEquipo = require('./routes/tipoEquipo')
const tipoProyecto = require('./routes/tipoProyecto')
const cliente = require('./routes/cliente')
const marca = require('./routes/universidad')
const inventario = require('./routes/inventario')
const universidad = require('./models/universidad')


// URI o endpoint
app.use('/api/tipoequipos', tipoEquipo)
app.use('/api/tipoproyectos', tipoProyecto)
app.use('/api/clientes', cliente)
app.use('/api/universidades', universidad)
app.use('/api/inventarios', inventario)

module.exports = app

