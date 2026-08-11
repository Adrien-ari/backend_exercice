import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler";
import {
  getAllEtudiants,
  getEtudiantById,
  createEtudiant,
  replaceEtudiant,
  updateEtudiant,
  deleteEtudiant,
} from "../controllers/etudiants.controller";

const router = Router();

// Action                        Méthode   URL              Code de succès
router.get("/", asyncHandler(async (req, res) => getAllEtudiants(req, res)));        // Lister tout        → 200
router.get("/:id", asyncHandler(async (req, res) => getEtudiantById(req, res)));      // Lire une ressource → 200
router.post("/", asyncHandler(async (req, res) => createEtudiant(req, res)));         // Créer              → 201
router.put("/:id", asyncHandler(async (req, res) => replaceEtudiant(req, res)));      // Modifier complet   → 200
router.patch("/:id", asyncHandler(async (req, res) => updateEtudiant(req, res)));     // Modifier partiel   → 200
router.delete("/:id", asyncHandler(async (req, res) => deleteEtudiant(req, res)));    // Supprimer          → 204

export default router;
