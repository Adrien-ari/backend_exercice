# API REST /etudiants — Express + TypeScript

Implémentation complète du CRUD `/etudiants`, conforme au tableau REST vu en séance,
avec gestion centralisée des erreurs.

| Action                          | Méthode | URL             | Code de succès |
|----------------------------------|---------|-----------------|-----------------|
| Lister toutes les ressources     | GET     | `/etudiants`     | 200             |
| Lire une ressource précise       | GET     | `/etudiants/:id` | 200             |
| Créer une ressource              | POST    | `/etudiants`     | 201             |
| Modifier une ressource (complète)| PUT     | `/etudiants/:id` | 200             |
| Modifier une ressource (partielle)| PATCH  | `/etudiants/:id` | 200             |
| Supprimer une ressource          | DELETE  | `/etudiants/:id` | 204             |

## Installation

```bash
npm install
```

## Lancer en développement

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000` (modifiable dans `.env`).

## Structure du projet

```
src/
├── index.ts                       # point d'entrée, montage des routes + erreurs
├── routes/etudiants.routes.ts     # URLs -> contrôleurs
├── controllers/etudiants.controller.ts  # logique de chaque action
├── middleware/
│   ├── ApiError.ts                # classe d'erreur avec code HTTP
│   └── errorHandler.ts            # gestion centralisée des erreurs (404 + 500 + ApiError)
├── data/etudiants.store.ts        # stockage en mémoire (à remplacer par une vraie BDD)
└── types/etudiant.ts              # types TypeScript de la ressource
```

## Tester avec Postman / Thunder Client

### 1. Lister tous les étudiants
```
GET http://localhost:3000/etudiants
```

### 2. Lire un étudiant précis
```
GET http://localhost:3000/etudiants/1
```

### 3. Créer un étudiant
```
POST http://localhost:3000/etudiants
Content-Type: application/json

{
  "nom": "Andria",
  "prenom": "Fanja",
  "email": "fanja.andria@example.com",
  "age": 20
}
```
→ réponse `201 Created` avec l'étudiant créé (id généré automatiquement).

### 4. Modifier complètement un étudiant (PUT)
```
PUT http://localhost:3000/etudiants/1
Content-Type: application/json

{
  "nom": "Rakoto",
  "prenom": "Hery",
  "email": "hery.new@example.com",
  "age": 23
}
```
Tous les champs sont requis : PUT remplace la ressource entière.

### 5. Modifier partiellement un étudiant (PATCH)
```
PATCH http://localhost:3000/etudiants/1
Content-Type: application/json

{
  "age": 24
}
```
Seuls les champs fournis sont modifiés.

### 6. Supprimer un étudiant
```
DELETE http://localhost:3000/etudiants/1
```
→ réponse `204 No Content`.

## Tester la gestion des erreurs

- `GET /etudiants/999` → `404 { "error": "Aucun étudiant avec l'id 999" }`
- `GET /etudiants/abc` → `400 { "error": "Identifiant invalide : \"abc\"" }`
- `POST /etudiants` avec un corps incomplet → `400` avec un message précis
- `GET /route-qui-n-existe-pas` → `404` géré par `notFoundHandler`
- Toute exception inattendue dans un contrôleur → `500`, interceptée par `errorHandler`

Comme toutes les erreurs sont levées avec `throw new ApiError(...)` (ou une exception
classique) et attrapées par `asyncHandler`, aucun contrôleur n'a besoin d'écrire de
`try/catch` ni de gérer lui-même le format de réponse d'erreur — tout passe par
`errorHandler.ts`, un seul et même endroit.
