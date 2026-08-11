import { Request, Response } from "express";
import { etudiantsStore } from "../data/etudiants.store";
import { ApiError } from "../middleware/ApiError";
import { EtudiantCreationInput, EtudiantUpdateInput } from "../types/etudiant";


function parseId(rawId: string): number {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    throw ApiError.badRequest(`Identifiant invalide : "${rawId}"`);
  }
  return id;
}


function validateCreationInput(body: unknown): EtudiantCreationInput {
  const { nom, prenom, email, age } = (body ?? {}) as Partial<EtudiantCreationInput>;

  if (!nom || typeof nom !== "string") {
    throw ApiError.badRequest("Le champ 'nom' est requis et doit être une chaîne.");
  }
  if (!prenom || typeof prenom !== "string") {
    throw ApiError.badRequest("Le champ 'prenom' est requis et doit être une chaîne.");
  }
  if (!email || typeof email !== "string") {
    throw ApiError.badRequest("Le champ 'email' est requis et doit être une chaîne.");
  }
  if (age !== undefined && typeof age !== "number") {
    throw ApiError.badRequest("Le champ 'age' doit être un nombre.");
  }

  return { nom, prenom, email, age };
}


export function getAllEtudiants(req: Request, res: Response) {
  const etudiants = etudiantsStore.findAll();
  res.status(200).json(etudiants);
}


export function getEtudiantById(req: Request, res: Response) {
  const id = parseId(req.params.id);
  const etudiant = etudiantsStore.findById(id);

  if (!etudiant) {
    throw ApiError.notFound(`Aucun étudiant avec l'id ${id}`);
  }

  res.status(200).json(etudiant);
}


export function createEtudiant(req: Request, res: Response) {
  const input = validateCreationInput(req.body);
  const nouvelEtudiant = etudiantsStore.create(input);
  res.status(201).json(nouvelEtudiant);
}


export function replaceEtudiant(req: Request, res: Response) {
  const id = parseId(req.params.id);
  const input = validateCreationInput(req.body);

  const updated = etudiantsStore.replace(id, input);
  if (!updated) {
    throw ApiError.notFound(`Aucun étudiant avec l'id ${id}`);
  }

  res.status(200).json(updated);
}


export function updateEtudiant(req: Request, res: Response) {
  const id = parseId(req.params.id);
  const input = (req.body ?? {}) as EtudiantUpdateInput;

  if (input.age !== undefined && typeof input.age !== "number") {
    throw ApiError.badRequest("Le champ 'age' doit être un nombre.");
  }

  const updated = etudiantsStore.update(id, input);
  if (!updated) {
    throw ApiError.notFound(`Aucun étudiant avec l'id ${id}`);
  }

  res.status(200).json(updated);
}

export function deleteEtudiant(req: Request, res: Response) {
  const id = parseId(req.params.id);
  const deleted = etudiantsStore.delete(id);

  if (!deleted) {
    throw ApiError.notFound(`Aucun étudiant avec l'id ${id}`);
  }

  res.status(204).send();
}
