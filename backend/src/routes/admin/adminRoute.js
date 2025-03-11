import express from "express";
import { agregarPromocion } from "../../controllers/admin/promoController.js";
import { obtenerPromociones } from "../../controllers/admin/promoController.js";

const router = express.Router();

router.post("/", agregarPromocion);

router.get("/", async (req, res) => {
    try {
        const promociones = await obtenerPromociones();
        res.json(promociones);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener promociones" });
        }
    });

export default router;