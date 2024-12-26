const express = require('express');
const nodemailer = require('nodemailer');
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

// Configuración del transporter de nodemailer para Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'medinadazadaniel@gmail.com',
        pass: 'gjylbwuppotzoqlq'
    }
});

// Verificar la conexión inmediatamente
transporter.verify(function(error, success) {
    if (error) {
        console.log('Error de verificación del transporter:', error);
    } else {
        console.log('Servidor listo para enviar correos');
    }
});

// Nueva ruta para procesar pagos con más logging
app.post('/api/procesar-pago', async (req, res) => {
  console.log('Datos recibidos en el servidor:', req.body);

  const { metodoPago, codigoRecibo, codigoUsuario, numeroTransaccion, montoPago } = req.body;
  
  if (!metodoPago || !codigoRecibo || !codigoUsuario || !numeroTransaccion || !montoPago) {
    console.log('Datos faltantes:', { metodoPago, codigoRecibo, codigoUsuario, numeroTransaccion, montoPago });
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos',
      missingFields: { metodoPago, codigoRecibo, codigoUsuario, numeroTransaccion, montoPago }
    });
  }

  const mailOptions = {
    from: '"Sistema de Pagos-Teleinca" <medinadazadaniel@gmail.com>',
    to: 'dameda97@gmail.com',
    subject: `Nuevo pago recibido - ${metodoPago}`,
    html: `
      <h2>SOLICITUD DE PAGO</h2>
      <p><strong>Número de deuda:</strong> ${codigoRecibo}</p>
      <p><strong>Código de abonado:</strong> ${codigoUsuario}</p>
      <p><strong>Número de Transferencia de ${metodoPago}:</strong> ${numeroTransaccion}</p>
      <p><strong>Monto de pago:</strong> S/. ${montoPago}</p>
    `
  };

  try {
    console.log('Intentando enviar correo con opciones:', mailOptions);
    const info = await transporter.sendMail(mailOptions);
    console.log('Información del envío:', info);
    res.json({ 
      success: true, 
      message: 'Correo enviado exitosamente',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Error detallado del servidor:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    
    res.status(500).json({
      success: false,
      message: 'Error al enviar el correo',
      error: {
        message: error.message,
        code: error.code,
        command: error.command
      }
    });
  }
});

// Manejo de errores básico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

