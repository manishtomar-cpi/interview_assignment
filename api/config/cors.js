//cors configure 
import cors from "cors";
import { AppError } from "../utils/appError.js";

const allowedOrigins = [
  "http://localhost:3000",  // for front end 
];

export const corsMiddleware = cors({
  origin: function (origin, cb) {
    if (!origin) return cb(null, true);

    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }

    // use AppError so errorHandler formats the response
    return cb(new AppError("CORS not allowed", 403, "CORS_FORBIDDEN"), false);
  },
  credentials: true,
});
