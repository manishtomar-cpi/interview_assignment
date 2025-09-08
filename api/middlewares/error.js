export function errorHandler(err, req, res, next) {
  console.error({ reqId: req.id, err });

  const status = err?.status ?? 500;
  const body = { error: err?.publicMessage || "internal server error" };

  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}
