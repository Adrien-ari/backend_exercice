export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  age?: number;
}

// Champs autorisés à la création : tout sauf l'id, généré par le serveur
export type EtudiantCreationInput = Omit<Etudiant, "id">;

// Champs autorisés en modification partielle (PATCH) : tout est optionnel
export type EtudiantUpdateInput = Partial<EtudiantCreationInput>;
