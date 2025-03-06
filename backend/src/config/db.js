import pkg from "pg";
const { Pool } = pkg;

// Datos de conexión
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Teleinca_web",
    password: "",
    port: 5432,
});

pool.connect()
    .then(() => console.log("Conectado a PostgreSQL"))
    .catch(err => console.error("Error de conexión a PostgreSQL:", err));

export default pool;