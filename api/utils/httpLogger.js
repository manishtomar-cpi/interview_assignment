//help us to get the structured logs on console on each request 
import pinoHttp from "pino-http";
import { logger } from "./logger.js";

export const httpLogger = pinoHttp({
  logger,

  // Choose log level based on status code or error presence
  customLogLevel: function (res, err) {
    if (err instanceof Error) return "error";    // runtime error
    if (res.statusCode >= 500) return "error";   // server error
    if (res.statusCode >= 400) return "warn";    // client error
    return "info";                               // success
  },

  // Limit what we log for requests
  serializers: {
    req(req) {
      return {
        id: req.id,          // request ID if you use requestId middleware
        method: req.method,  // GET, POST, etc.
        url: req.url,        // route path
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },

  // customize the log message
  customSuccessMessage: function (req, res) {
    return `${req.method} ${req.url} -> ${res.statusCode}`;
  },
  customErrorMessage: function (req, res, err) {
    return `${req.method} ${req.url} -> ${res.statusCode} (error: ${err.message})`;
  },
});
