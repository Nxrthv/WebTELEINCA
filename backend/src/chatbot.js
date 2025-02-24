import dialogflow from "@google-cloud/dialogflow";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// Configurar ruta del archivo JSON de credenciales
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "dialogflow-key.json");

// Leer el archivo JSON de credenciales
const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, "utf8"));
const sessionClient = new dialogflow.SessionsClient({ credentials });

const PROJECT_ID = credentials.project_id;

export async function detectIntent(message, sessionId = "test-session") {
  const sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "es",
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    return responses[0].queryResult.fulfillmentText;
  } catch (error) {
    console.error("Error en Dialogflow:", error);
    throw error;
  }
}
