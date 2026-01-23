import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { PORT } from "./utils/env";
import jobRoutes from "./routes/jobRoutes";

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Recruitment Screening API & Talent Matching",
      version: "1.0.0",
      description: "API for screening candidates using AI",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
      {
        url: `https://server.production.onrender.com`,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        CreateJobInput: {
          type: "object",
          required: ["title", "quota", "requiredSkills", "cvUrls"],
          properties: {
            title: {
              type: "string",
              description: "The job title",
              example: "Junior Backend Engineer",
            },
            quota: {
              type: "integer",
              description: "Number of candidates to hire",
              example: 2,
            },
            requiredSkills: {
              type: "array",
              items: {
                type: "string",
              },
              description: "List of required skills",
              example: ["Node.js", "Express", "PostgreSQL"],
            },
            cvUrls: {
              type: "array",
              items: {
                type: "string",
              },
              description: "List of CV URLs to analyze",
              example: [
                "https://example.com/cv1.pdf",
                "https://example.com/cv2.pdf",
              ],
            },
          },
        },
        JobResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            ownerId: {
              type: "string",
            },
            title: {
              type: "string",
            },
            status: {
              type: "string",
              enum: ["PROCESSING", "COMPLETED"],
            },
            totalCandidates: {
              type: "integer",
            },
            createdAt: {
              type: "object",
              properties: {
                _seconds: { type: "integer" },
                _nanoseconds: { type: "integer" },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/jobs", jobRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
