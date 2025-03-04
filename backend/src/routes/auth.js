import express from 'express';
import { login } from '../controllers/auth.js';

const router = express.Router();

const ADMIN_CREDENTIALS = {
    dni: '4444',
    codigo: 'admin'
};

router.post('/login', async (req, res) => {
    const { dni, codigo } = req.body;

    if (dni === ADMIN_CREDENTIALS.dni && codigo === ADMIN_CREDENTIALS.codigo) {
        return res.json({ message: 'Acceso concedido', redirect: '/a/url' });
    }

    return res.status(401).json({ message: 'Credenciales incorrectas' });
});

export default router;