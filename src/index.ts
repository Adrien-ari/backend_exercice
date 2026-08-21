import express, { response } from "express";
import dotenv from "dotenv";
import { Router } from "express";
import { StudentsRepository } from "./repository/studentsRepository";
import { json } from "stream/consumers";
import routerIndex from "./routes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routerIndex);

app.listen(port, ()=> {
  console.log("server listenin on port " + port);
})


// Petite route de bienvenue pour vérifier que le serveur tourne
// app.get("/", (req, res) => {
//   res.send("API /students is running");
// });


// app.get("/students", async (req, res) => {
 
//   const repo = new StudentsRepository();
//    try {
//         const data = await repo.findAll(); // 1. Résout la promesse
//         res.json(data);                    // 2. Envoie le tableau brut (JSON)
//     } catch (error) {
//         res.status(500).send("Erreur serveur");
//     }
// });