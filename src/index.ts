import express from "express";
import dotenv from "dotenv";
import etudiantsRoutes from "./routes/etudiants.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Permet à Express de comprendre les corps de requête en JSON (POST/PUT/PATCH)
app.use(express.json());

// Petite route de bienvenue pour vérifier que le serveur tourne
app.get("/", (req, res) => {
  res.send("API /etudiants en cours d'exécution. Essayez GET /etudiants.");
});

// Toutes les routes de la ressource "etudiants", montées sur /etudiants
app.use("/etudiants", etudiantsRoutes);

// --- Gestion centralisée des erreurs (toujours en dernier) ---
app.use(notFoundHandler); // 404 pour toute route non reconnue
app.use(errorHandler);    // transforme toute erreur (ApiError ou inattendue) en réponse JSON

app.listen(port, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${port}`);
});
