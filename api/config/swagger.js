import swaggerJSDoc from "swagger-jsdoc";

const PORT = process.env.PORT
const HOST =  "http://localhost";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dashboard API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      { url: "/" },
    ],
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
