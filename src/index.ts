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

// Root / Health-check Route
app.get("/", (req, res) => {
  if (req.headers.accept?.includes("application/json")) {
    return res.status(200).json({
      status: "online",
      message: "Express TS User Management API is running",
      endpoints: {
        users: "/api/users",
      },
    });
  }

  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px;">
      <h1>🚀 Express TS User Management API</h1>
      <p>Status: <span style="color: green; font-weight: bold;">Online & Ready</span></p>
      <p>Try visiting <a href="/api/users">/api/users</a> to fetch data.</p>
    </div>
  `);
});

app.use("/api/users", userRouter);

// Start Server & Connect to Database
app.listen(PORT, async () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  await initDb();
});

export default app;
