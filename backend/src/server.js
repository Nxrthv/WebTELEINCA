import express from "express";
import cors from "cors";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import pool from './config/database.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'backend/src/views'));

app.use('/api/users', authRoutes);

//Recursos Frontend
app.use(express.static(path.join(process.cwd(), 'frontend', 'public')));
app.use('/c', express.static(path.join(process.cwd(), 'frontend', 'public')));
app.use('/ce', express.static(path.join(process.cwd(), 'frontend', 'public')));
app.use('/co', express.static(path.join(process.cwd(), 'frontend', 'public')));
app.use('/log', express.static(path.join(process.cwd(), 'frontend', 'public')));

//Administrador
app.get('/a/url', (req, res) => {  
    const id = uuidv4();
    res.redirect(`/a/${id}`);
});
app.get('/a/:id', (req, res) => {
    res.render('admin', { title: "Administrador | TELEINCA S.A.C." });
});

//Ruta Principal
app.get('/', async (req, res) => {
    res.render('index', { title: "TELEINCA S.A.C." });
});

//Login
app.get('/log/url', (req, res) => {
    const id = uuidv4();
    res.redirect(`/log/${id}`);
});
app.get('/log/:id', (req, res) => {
    const { id } = req.params;
    res.render('login', { title: "Iniciar Sesión | TELEINCA S.A.C.", id });
});

//Guia de Canales
app.get('/c/url', (req, res) => {
    const id = uuidv4();
    res.redirect(`/c/${id}`);
});
app.get('/c/:id', (req, res) => {
    const { id } = req.params;
    res.render('canales', { title: "Tv Digital | TELEINCA S.A.C.", id });
});

//Centros de Experiencia
app.get('/ce/url', (req, res) => {
    const id = uuidv4();
    res.redirect(`/ce/${id}`);
});
app.get('/ce/:id', (req, res) => {
    const { id } = req.params;
    res.render('centrosDeExperiencia', { title: "Centros de Experiencia | TELEINCA S.A.C.", id });
});

//Conocenos
app.get('/co/url', (req, res) => {
    const id = uuidv4();
    res.redirect(`/co/${id}`);
});
app.get('/co/:id', (req, res) => {
    const { id } = req.params;
    res.render('conocenos', { title: "Conocenos | TELEINCA S.A.C.", id });
});

//Ruta Localhost
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});