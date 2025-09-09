import express from "express";
import swaggerUi from "swagger-ui-express";
import pinoHttp from "pino-http";

import { swaggerSpec } from "./config/swagger.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { httpLogger } from "./utils/httpLogger.js";
//function for creating the server
export function createServer() {
  const app = express();

  //middlewares
  app.use(express.json());
  app.use(httpLogger);
  //swagger
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //routes
  app.use("/", healthRoutes);
  app.use("/dashboards", dashboardRoutes);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
