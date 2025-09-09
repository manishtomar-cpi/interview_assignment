// custom error for controlled failures
export class AppError extends Error {
  constructor(message, status = 500, code = "INTERNAL_ERROR") {
    super(message);
    this.status = status;   // http status
    this.code = code;       // error code
    this.isOperational = true; // flag for known/expected errors
    Error.captureStackTrace(this, this.constructor);
  }
}
