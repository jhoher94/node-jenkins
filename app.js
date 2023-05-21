const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')


// middlewares
app.use(cors({origin:'*'}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const proyecto = require('./routes/proyecto')

// URI o endpoint

app.use('/api/proyectos', proyecto)

module.exports = app

