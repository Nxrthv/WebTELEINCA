const express = require('express');//Habilita Express
const { Pool } = require('pg');
const app = express();
const cors = require('cors');//Habilita cors 

app.use(cors());//Habilita cors en todas las rutas
// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pruebaRecibos',
  password: '1111',
  port: 5433,
});

// Endpoint para obtener los recibos
app.get('/api/recibos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recibos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener recibos:', error);
    res.status(500).json({ error: 'Error al obtener los recibos' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});


/*
// Función para probar la conexión y mostrar los recibos
async function probarConexion() {
    try {
        const result = await pool.query('SELECT * FROM recibos');
        console.log('Conexión exitosa a la base de datos');
        console.log('Contenido de la tabla recibos:');
        console.table(result.rows);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
}

// Ejecutar la función de prueba
probarConexion();*/
