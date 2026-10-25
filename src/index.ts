import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import fs from "fs";
import userRouter from "./routes/users";
import { prisma } from "./config/prisma";

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve static forms directory for local and Vercel environments
const formsPath = fs.existsSync(path.join(process.cwd(), "src", "forms"))
  ? path.join(process.cwd(), "src", "forms")
  : path.join(__dirname, "forms");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(formsPath));

// Root Route: Serve the User Management Portal UI (like localhost)
app.get("/", (req, res) => {
  // Return JSON only if strictly requested without HTML
  if (
    req.headers.accept?.includes("application/json") &&
    !req.headers.accept?.includes("text/html")
  ) {
    return res.status(200).json({
      status: "online",
      message: "Express TS User Management API is running",
      endpoints: {
        users: "/api/users",
      },
    });
  }

  const possiblePaths = [
    path.join(formsPath, "index.html"),
    path.join(process.cwd(), "src", "forms", "index.html"),
    path.join(__dirname, "forms", "index.html"),
    path.join(__dirname, "../src/forms", "index.html"),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
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

// Start Server & Connect to Database (Local development)
app.listen(PORT, async () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  // Verify Prisma can connect to the database
  try {
    await prisma.$connect();
    console.log("✅ [Database] Connected successfully via Prisma!");
  } catch (error: any) {
    console.error("❌ [Database] Prisma connection error:", error.message);
  }
});

export default app;
