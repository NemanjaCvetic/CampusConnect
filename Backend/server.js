import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/config/db.js"; // runs the connection test on startup
import authRoutes from "./src/routes/authRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────

// cors() allows our React frontend (running on port 5173) to make
// requests to this backend (running on port 3000).
// Without this, the browser would block the requests.
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// express.json() lets us read JSON bodies from incoming requests.
// Without this, req.body would always be undefined.
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
// We'll add routes here as we build each feature, for example:
// app.use("/api/auth", authRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
// A simple endpoint to confirm the server is running.
// Visit http://localhost:3000/api/health in your browser to test it.
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "CampusConnect API is running" });
});

app.use("/api/auth", authRoutes);

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
