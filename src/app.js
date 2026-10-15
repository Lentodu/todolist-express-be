import express from "express";
import cors from "cors";
import logger from "./middleware/middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/api/health", (req, res) => {
  res.json({ sttaus: "ok" });
});

export default app;
