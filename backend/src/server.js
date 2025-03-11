import express from "express";
import cors from "cors";
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import pool from './config/db.js';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/users/userRoute.js';
import adminRoute from './routes/admin/adminRoute.js';
import { obtenerPromociones } from "./controllers/admin/promoController.js";

const app = express();
const __dirname = path.resolve();
const PUBLIC_PATH = path.join(process.cwd(), 'frontend', 'public');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Conf EJS
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "backend", "src", "views"));
app.use(express.static("public"));
app.use(express.json());

//Static
app.use(express.static(PUBLIC_PATH));

//Rutas api
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoute);

//Administrador
app.get("/admin", async (req, res) => {
    try {
        const promotions = await obtenerPromociones();
        res.render("admin", { title: "Panel de Administración", promotions });  
    } catch (error) {
        console.error("Error al obtener promociones:", error);
        res.status(500).render("admin", { promotions: [] });
    }
});

//Ruta Principal
app.get('/', (req, res) => {
    res.render('index', { title: "TELEINCA S.A.C." });
});

app.get("/api/planes/duos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM planes WHERE plan = 'Dúo'");
        
            if (!Array.isArray(result.rows)) {
            console.error("⚠️ Error: El resultado no es un array:", result);
            return res.status(500).json({ error: "La consulta no devolvió un array" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("❌ Error obteniendo los planes Duo:", error);
        res.status(500).json({ error: "Error obteniendo los planes Duo" });
    }
});

app.get("/api/planes/internet", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM planes WHERE plan = 'Internet'");
        
            if (!Array.isArray(result.rows)) {
            console.error("⚠️ Error: El resultado no es un array:", result);
            return res.status(500).json({ error: "La consulta no devolvió un array" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("❌ Error obteniendo los planes Internet:", error);
        res.status(500).json({ error: "Error obteniendo los planes Internet" });
    }
});

app.get("/api/planes/cable", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM planes WHERE plan = 'Tv Digital'");
        
            if (!Array.isArray(result.rows)) {
            console.error("⚠️ Error: El resultado no es un array:", result);
            return res.status(500).json({ error: "La consulta no devolvió un array" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("❌ Error obteniendo los planes Tv Cable:", error);
        res.status(500).json({ error: "Error obteniendo los planes Tv Cable" });
    }
});

app.get("/u", (req, res) => {
    res.render("panelUser", { title: "Bienvenid@ a tu cuenta | TELEINCA S.A.C." });
});

    // Rutas con generación de UUID
    const dynamicRoutes = [
        { path: "log", view: "login", title: "Iniciar Sesión | TELEINCA S.A.C." },
        { path: "c", view: "canales", title: "Tv Digital | TELEINCA S.A.C." },
        { path: "ce", view: "centrosDeExperiencia", title: "Centros de Experiencia | TELEINCA S.A.C." },
        { path: "co", view: "conocenos", title: "Conócenos | TELEINCA S.A.C." },
        // { path: "u", view: "panelUser", title: "Bienvenid@ a tu cuenta | TELEINCA S.A.C." }
    ];

    // Genera automáticamente las rutas con UUID
    dynamicRoutes.forEach(({ path, view, title }) => {
        app.get(`/${path}/url`, (req, res) => res.redirect(`/${path}/${uuidv4()}`));
        app.get(`/${path}/:id`, (req, res) => res.render(view, { title, id: req.params.id }));
    });

//Server Localhost
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));