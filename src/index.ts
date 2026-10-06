import express from "express";
import userRouter from "./routes/users";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/forms"));
app.use(express.json());

app.use("/api/users", userRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
