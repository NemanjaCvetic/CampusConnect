import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// ── Register ──────────────────────────────────────────────────────────────────
// POST /api/auth/register
// Expects: { name, email, password }
export async function register(req, res) {
    const { name, email, password } = req.body;

    // 1. Check all fields are present
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Validate university email
    if (!email.endsWith("@student.upr.si")) {
        return res.status(400).json({ message: "Only @student.upr.si emails are allowed" });
    }

    // 3. Validate password length
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {
        // 4. Check if email is already registered
        const [existing] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );
        if (existing.length > 0) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // 5. Hash the password — never store plain text passwords
        // 10 is the "salt rounds" — higher = more secure but slower
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6. Insert the new user into the database
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        // 7. Return success with the new user's id
        return res.status(201).json({
            message: "Account created successfully",
            userId: result.insertId,
        });

    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

// ── Login ─────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Expects: { email, password }
export async function login(req, res) {
    const { email, password } = req.body;

    // 1. Check all fields are present
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // 2. Find the user by email
        const [rows] = await pool.query(
            "SELECT id, name, email, password, role FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            // Use a vague message so we don't reveal whether the email exists
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = rows[0];

        // 3. Compare the provided password with the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 4. Create a JWT token
        // The token contains the user's id and role so we can read it later
        // without hitting the database on every request.
        // It expires in 7 days — after that the user needs to log in again.
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 5. Return the token and basic user info
        // The frontend will store this token and send it with future requests
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
