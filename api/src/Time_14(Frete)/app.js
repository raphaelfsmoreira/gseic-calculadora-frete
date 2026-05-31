const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const freteRoutes = require('./frete.routes')

// Definindo as rotas de frete (ver freteRoute.js)
app.use('/api/frete', freteRoutes);

module.exports = app;