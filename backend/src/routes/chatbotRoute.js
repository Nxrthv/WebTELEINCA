// import express from "express";
// import fetch from "node-fetch";

// const router = express.Router();

// router.get("/api/magicloops", async (req, res) => {
//     const prompt = req.query.prompt || "I want to know about internet and TV plans";

//     try {
//         const response = await fetch(`https://magicloops.dev/api/loop/12d8089b-c83a-40e5-802d-124fbe74e634/run?prompt=${encodeURIComponent(prompt)}`, {
//             method: "GET",
//             headers: {
//                 "Authorization": "TOKEN",
//                 "Content-Type": "application/json"
//             }
//         });

//         if (!response.ok) throw new Error(`Error en la API: ${response.status}`);

//         const data = await response.json();
//         res.json({ response: data.response });

//     } catch (error) {
//         console.error("Error al obtener respuesta de MagicLoops:", error.message);
//         res.status(500).json({ response: "Error al obtener datos de la API." });
//     }
// });

// export default router;