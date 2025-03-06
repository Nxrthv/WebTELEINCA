import pool from '../config/database.js';

export const login = async (req, res) => {
    const { dni, codigo } = req.body;

    try {
        const result = await pool.query(
            'SELECT tipo_usuario FROM "SH_teleinca01".abonados WHERE codigo = $1 AND dni = $2',
            [dni, codigo]
        );

        if (result.rows.length > 0) {
            const tipoUsuario = result.rows[0].tipo_usuario;
            if (tipoUsuario === 'admin') {
                res.redirect('/admin');
            } else {
                res.redirect('/u/url');
            }
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
};
