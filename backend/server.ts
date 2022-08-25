import express from "express";
import { PORT } from "./utils/config";
import { errorHandler } from "./middleware/errorMiddleware";
import { connectDB } from "./database/db";

connectDB();

const app = express();
app.use(express.json());

// Project Routes
app.use("/api/projects", require("./routes/projectRoutes"));

// User Routes Schema
app.use("/api/users", require("./routes/userRoutes"));

// Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started to listen on ${PORT}`);
});
