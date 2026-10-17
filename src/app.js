import express from "express";
import cors from "cors";
// import morgan from "morgan";
import logger from "./middleware/middleware.js";
import todoRoutes from "./routes/route.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(morgan("dev"));
app.use(logger);

app.use("/todos", todoRoutes);

app.use(errorHandler);

export default app;
