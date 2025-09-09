// cors configure
import cors from "cors";
import { AppError } from "../utils/appError.js";

// read allowed origins from env if not foun fallback to localhost:3000
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

export const corsMiddleware = cors({
  origin: function (origin, cb) {
    // allow requests with no origin (curl, postman, smoke tests)
    if (!origin) return cb(null, true);

    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }

    // use central error handler
    return cb(new AppError("CORS not allowed", 403, "CORS_FORBIDDEN"), false);
  },
  credentials: true,
});
