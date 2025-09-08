import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
//function for creating the server
export function createServer() {
  const app = express();

  //middlewares
  app.use(express.json());
  app.use(morgan("dev"));

  //swagger
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  //routes
  app.use("/", healthRoutes);
  app.use("/dashboards", dashboardRoutes);

  app.use(errorHandler);
  return app;
}
