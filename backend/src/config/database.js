const { Pool } = require('pg');

const pool = new Pool({
  user: 'cab_vision_dev',
  host: 'db01.grupocablevision.com',
  database: 'cablevision',
  password: 'OAak1BtP!a',
  port: 5432,
});

// Opción 1: Exportación más moderna
//export default pool;

module.exports = pool;
