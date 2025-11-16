import express from "express";
import type { Application, Request, Response } from "express";
import mongoose from "mongoose";
import session from "express-session"
import passport from "./config/passport";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import sequelize from "./config/db";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/api/admin";
import { isAuthenticated, hasRole } from "./middleware/authenticate";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const secretKey = process.env.SESSION_SECRET || "default_secret";
// ⚙️ Setup express-session
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

// 🧩 Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/admin", isAuthenticated, hasRole("admin"), adminRoutes)


//SQL connection
async function main() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    return sequelize;
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

main();

// MongoDB connection
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("❌ MONGO_URI is not defined in .env file");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Sample route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
