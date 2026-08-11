import { Etudiant, EtudiantCreationInput, EtudiantUpdateInput } from "../types/etudiant";

class EtudiantsStore {
  private etudiants: Etudiant[] = [
    { id: 1, nom: "Rakoto", prenom: "Hery", email: "hery.rakoto@example.com", age: 21 },
    { id: 2, nom: "Rabe", prenom: "Voahangy", email: "voahangy.rabe@example.com", age: 22 },
  ];
  private nextId = 3;

  findAll(): Etudiant[] {
    return this.etudiants;
  }

  findById(id: number): Etudiant | undefined {
    return this.etudiants.find((e) => e.id === id);
  }

  create(input: EtudiantCreationInput): Etudiant {
    const etudiant: Etudiant = { id: this.nextId++, ...input };
    this.etudiants.push(etudiant);
    return etudiant;
  }

  /** Remplacement complet (PUT) : tous les champs doivent être fournis. */
  replace(id: number, input: EtudiantCreationInput): Etudiant | undefined {
    const index = this.etudiants.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    this.etudiants[index] = { id, ...input };
    return this.etudiants[index];
  }


  update(id: number, input: EtudiantUpdateInput): Etudiant | undefined {
    const index = this.etudiants.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    this.etudiants[index] = { ...this.etudiants[index], ...input };
    return this.etudiants[index];
  }

  delete(id: number): boolean {
    const index = this.etudiants.findIndex((e) => e.id === id);
    if (index === -1) return false;
    this.etudiants.splice(index, 1);
    return true;
  }
}

export const etudiantsStore = new EtudiantsStore();
