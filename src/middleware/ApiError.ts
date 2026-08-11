/**
 * Erreur "métier" avec un code HTTP attaché.
 * Les contrôleurs lancent (throw) ce type d'erreur plutôt que de gérer
 * les réponses d'erreur eux-mêmes. Le middleware errorHandler centralisé
 * (voir errorHandler.ts) se charge ensuite de la transformer en réponse JSON.
 */
export class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }

  static notFound(message = "Ressource introuvable") {
    return new ApiError(404, message);
  }

  static badRequest(message = "Requête invalide") {
    return new ApiError(400, message);
  }
}
