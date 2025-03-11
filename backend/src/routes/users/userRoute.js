import express from 'express';
import pool from '../../config/database.js';
const router = express.Router();

router.get('/pagos/:codigoUsuario', async (req, res) => {
    try {
        const { codigoUsuario } = req.params;

        const query = `
            SELECT DISTINCT
                d.codigo_abonado,
                k.nombres,
                k.dni,
                cb.concepto, 
                d.monto AS deuda,
                d.codigo_cobro AS codigo_pago,
                TO_CHAR(d.fecha_vencimiento, 'YYYY-MM-DD') AS fecha_vencimiento,
                TO_CHAR(d.fecha_ultimo_pago, 'YYYY-MM-DD') AS fecha_ultimo_pago
            FROM 
                "SH_teleinca01".deuda d
            INNER JOIN 
                "SH_teleinca01".abonados k
                ON d.codigo_abonado = k.codigo
            LEFT JOIN 
                "ventas".conceptos_comprobante cb
                ON d.detalle::INTEGER = cb.id
            LEFT JOIN 
                (SELECT DISTINCT ON (codigo_abonado) * FROM "SH_teleinca01".cobros_servicio ORDER BY codigo_abonado, fecha_cancelacion DESC) cs
                ON d.codigo_abonado = cs.codigo_abonado
            WHERE 
                (d.codigo_cobro IS NOT NULL AND trim(d.codigo_cobro) != '')
                AND d.anulado = 'f'
                AND cs.anulado = 'f'
                AND d.codigo_abonado = $1
            ORDER BY
                fecha_ultimo_pago DESC;
        `;

        const result = await pool.query(query, [codigoUsuario]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(result.rows);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

router.get('/deudas/:codigoUsuario', async (req, res) => {
    try {
        const { codigoUsuario } = req.params;

        const query = `
            SELECT DISTINCT
                d.codigo_abonado,
                d.codigo,
                k.dni,
                cb.concepto, 
                d.monto AS deuda,
                d.codigo_cobro AS codigo_pago,
                cs.anulado AS servicio_anulado,
                TO_CHAR(d.fecha_vencimiento, 'YYYY-MM-DD') AS fecha_vencimiento,
                d.fecha_ultimo_pago
            FROM 
                "SH_teleinca01".deuda d
            INNER JOIN 
                "SH_teleinca01".abonados k
                ON d.codigo_abonado = k.codigo
            LEFT JOIN 
                "ventas".conceptos_comprobante cb
                ON d.detalle::INTEGER = cb.id
            LEFT JOIN 
                "SH_teleinca01".cobros_servicio cs
                ON d.codigo_abonado = cs.codigo_abonado
            WHERE 
                (d.codigo_cobro IS NULL OR d.codigo_cobro = '')
                AND cs.anulado = 'f'
                AND d.anulado = 'f'
                AND d.fecha_ultimo_pago <= (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 MONTH - 1 DAY')
                AND d.codigo_abonado = $1
            ORDER BY
                d.codigo_abonado ASC,
                d.fecha_ultimo_pago DESC
        `;

        const result = await pool.query(query, [codigoUsuario]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(result.rows);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default router;