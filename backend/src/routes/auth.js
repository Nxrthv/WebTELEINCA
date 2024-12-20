const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.post('/login', async (req, res) => {
  try {
    const { dni, password } = req.body;
    
    const query = 'SELECT id_abonado, codigo_abonado, nombre_abonado FROM abonados WHERE id_abonado = $1 AND codigo_abonado = $2';
    const result = await pool.query(query, [dni, password]);

    if (result.rows.length > 0) {
      res.json({
        success: true,
        nombre: result.rows[0].nombre_abonado
      });
    } else {
      res.json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
});

module.exports = router; 