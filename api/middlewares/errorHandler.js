export function errorHandler(err, req, res, _next) {
  // default values
  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.isOperational ? err.message : "Internal server error";

  // loging full error
  console.error({
    error: {
      message: err.message,
      stack: err.stack,
      code,
      status,
    },
  });

  res.status(status).json({
    error: { code, message },
  });
}
