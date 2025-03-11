app.get("/api/recibos-pagados/:clienteId", async (req, res) => {
    const { clienteId } = req.params;

    try {
        const result = await pool.query(
            "SELECT id, fecha_pago, monto, estado FROM recibos WHERE cliente_id = $1 AND estado = 'pagado'",
            [clienteId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error obteniendo recibos pagados:", error);
        res.status(500).json({ error: "Error obteniendo los recibos." });
    }
});