const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recibos WHERE estado_recibo = $1', ['pagado']);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener recibos:', error);
    res.status(500).json({ error: 'Error al obtener los recibos' });
  }
});

module.exports = router;
