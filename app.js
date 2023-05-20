const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')


// middlewares
app.use(cors({origin:'*'}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


const etapa = require('./routes/etapa')
const tipoProyecto = require('./routes/tipoProyecto')
const cliente = require('./routes/cliente')
const proyecto = require('./routes/proyecto')
const universidad = require('./models/universidad')


// URI o endpoint

app.use('/api/etapas', etapa)
app.use('/api/tipoproyectos', tipoProyecto)
app.use('/api/clientes', cliente)
app.use('/api/universidades', universidad)
app.use('/api/inventarios', proyecto)

module.exports = app

