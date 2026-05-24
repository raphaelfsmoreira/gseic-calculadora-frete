const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const freteRoutes = require('./freteRoutes')

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    by: 'SLMM28',
    turma: '101'
  });
});

// Definindo as rotas de frete (ver freteRoute.js)
app.use('/api/frete', freteRoutes);

module.exports = app;