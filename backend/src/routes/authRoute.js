import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Credenciales de administrador predefinidas
const ADMIN_CREDENTIALS = {
    dni: '4444',
    codigo: 'admin'
};

router.post('/login', async (req, res) => {
    const { dni, codigo } = req.body;

    try {
        if (dni === ADMIN_CREDENTIALS.dni && codigo === ADMIN_CREDENTIALS.codigo) {
            return res.json({
                message: 'Acceso concedido como Administrador',
                redirect: '/admin'
            });
        }

        const query = `SELECT nombres, apellido_paterno, apellido_materno, codigo FROM "SH_teleinca01".abonados WHERE dni = $1 AND codigo = $2`;
        const result = await pool.query(query, [dni, codigo]);

        if (result.rows.length > 0) {
            const usuario = result.rows[0];

            return res.json({
                message: 'Acceso concedido como Usuario',
                redirect: '/u',
                usuario: {
                    nombres: usuario.nombres + ' ' + usuario.apellido_paterno + ' ' + usuario.apellido_materno,
                    codigo: usuario.codigo
                }
            });
        }

        return res.status(401).json({ message: 'Credenciales incorrectas' });

    } catch (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default router;