import pool from '../../config/db.js';

export const agregarPromocion = async (req, res) => {
    try {   
        const { plan, nombreplan, mbps, canales, instalacion, zona, precio, active, popularidad } = req.body;

        const query = `
            INSERT INTO planes (plan, nombreplan, velocidadmbps, cantcanales, instalacion, disponibilidad, precio, active, popularidad)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
        `;

        const values = [plan, nombreplan, mbps, canales, instalacion, zona, precio, active, popularidad];

        const result = await pool.query(query, values);

        res.status(201).json({ message: "Promoción creada", promo: result.rows[0] });
    } catch (error) {
        console.error("Error al agregar promoción:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const obtenerPromociones = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM planes ORDER BY id DESC;");
        return result.rows;
    } catch (error) {
        console.error("Error al obtener promociones:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};