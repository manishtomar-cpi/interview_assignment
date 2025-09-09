import { AppError } from "../utils/appError.js";

export function notFound(req, res, next) {
  next(new AppError(`Route ${req.originalUrl} not found`, 404, "NOT_FOUND")); //send back the url which is missing
}
