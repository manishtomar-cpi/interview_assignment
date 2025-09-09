import express from "express";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { httpLogger } from "./utils/httpLogger.js";
import { corsMiddleware } from "./config/cors.js";

//function for creating the server
export function createServer() {
  const app = express();

  //security and json
  app.use(corsMiddleware);
  app.use(express.json({ limit: "1mb" }));

  //logging
  app.use(httpLogger);

  //swagger
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //routes
  app.use("/", healthRoutes);
  app.use("/dashboards", dashboardRoutes);

  //errors
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
