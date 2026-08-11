import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

/**
 * Middleware de gestion centralisée des erreurs.
 *
 * Express reconnaît ce middleware comme "gestionnaire d'erreurs" uniquement
 * parce qu'il déclare 4 paramètres (err, req, res, next). Il doit être
 * enregistré en DERNIER, après toutes les routes, dans src/index.ts.
 *
 * Grâce à ça, aucun contrôleur n'a besoin d'écrire res.status(...).json(...)
 * pour les erreurs : il suffit de faire `throw new ApiError(...)` ou
 * `next(err)`, et tout se termine ici, au même endroit.
 */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Erreur inattendue (bug, exception non prévue, etc.)
  console.error(err);
  return res.status(500).json({
    error: "Erreur interne du serveur",
  });
}

/**
 * Middleware appelé quand aucune route ne correspond à l'URL demandée.
 * À enregistrer juste avant errorHandler.
 */
export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} introuvable`));
}

/**
 * Petit utilitaire pour éviter d'écrire try/catch dans chaque contrôleur
 * async. Il attrape automatiquement les erreurs et les transmet à next(),
 * qui les fait atterrir dans errorHandler ci-dessus.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
