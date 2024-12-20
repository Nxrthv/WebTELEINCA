const express = require('express');
const cors = require('cors');
const recibosPagadosRoutes = require('./src/routes/recibos_pagados');
const recibosPendientesRoutes = require('./src/routes/recibos_pendientes');
const authRoutes = require('./src/routes/auth');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba básica
app.get('/', (req, res) => {
  res.send('API de Recibos funcionando');
});

// Rutas
app.use('/api/recibos_pagados', recibosPagadosRoutes);
app.use('/api/recibos_pendientes', recibosPendientesRoutes);
app.use('/api', authRoutes);

// Manejo de errores básico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
