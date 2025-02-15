import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url"; // Import this function
import { connectDB } from "./Helper/database.js";
import { AuthRouter } from "./routes/AuthRoute.js";
import { BlogRouter } from "./routes/BlogRoute.js";
import { ProjectRouter } from "./routes/ProjectRoute.js";
import { SkillRouter } from "./routes/SkillRoute.js";
import { ReviewRouter } from "./routes/ReviewRoute.js";

dotenv.config();

const app = express();

// Resolve the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

// Database connection
connectDB();

// Define API routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/blog", BlogRouter);
app.use("/api/v1/project", ProjectRouter);
app.use("/api/v1/skill", SkillRouter);
app.use("/api/v1/review", ReviewRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
