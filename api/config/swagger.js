import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_URL = process.env.API_PUBLIC_URL;
const PORT = process.env.PORT || 3000;
const LOCAL_URL = `http://localhost:${PORT}`;

const servers = [{ url: "/" }, { url: PUBLIC_URL || LOCAL_URL }];

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dashboard API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers,
  },
  apis: [path.resolve(__dirname, "../routes/*.js")],
};

export const swaggerSpec = swaggerJSDoc(options);
