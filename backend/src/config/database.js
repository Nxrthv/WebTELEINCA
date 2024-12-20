const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pruebaRecibos',
  password: '1111',
  port: 5433,
});

// Opción 1: Exportación más moderna
//export default pool;

module.exports = pool;
