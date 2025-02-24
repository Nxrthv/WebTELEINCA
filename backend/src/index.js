import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { detectIntent } from "./chatbot.js";

const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json());

app.use(express.static("frontend"))
app.use("/css", express.static("frontend/styles"));
app.use("/js", express.static("frontend/Resources/js"));

// Ruta para el chatbot
app.post("/chatbot", async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensaje requerido" });
  }

  try {
    const response = await detectIntent(message, sessionId || "default-session");
    res.json({ reply: response });
  } catch (error) {
    console.error("Error en el chatbot:", error);
    res.status(500).json({ error: "Error procesando la solicitud", details: error.message });
  }
});

// Servir archivos estáticos al final para evitar conflictos
app.use(express.static("frontend"));

const port = PORT || 4444; // Asegurar un valor por defecto
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});