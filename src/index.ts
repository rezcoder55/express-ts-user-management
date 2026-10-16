import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRouter from "./routes/users";
import { initDb } from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/forms"));
app.use(express.json());

app.use("/api/users", userRouter);

// Start Server & Connect to Database
app.listen(PORT, async () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  await initDb();
});
