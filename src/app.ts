import express, { type Request, type Response } from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Root healthcheck
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "NGC College Management Server is Running",
  });
});

// API Routes
app.use("/api/v1", routes);

export default app;
