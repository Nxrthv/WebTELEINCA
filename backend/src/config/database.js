import pkg from "pg";
const { Pool } = pkg;

// Datos de conexión
const pool = new Pool({
    user: "cab_vision_dev",
    host: "db01.grupocablevision.com",
    database: "cablevision",
    password: "OAak1BtP!a",
    port: 5432,
});

pool.connect()
    .then(() => console.log("Conectado a PostgreSQL"))
    .catch(err => console.error("Error de conexión a PostgreSQL:", err));

export default pool;