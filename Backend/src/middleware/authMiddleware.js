import jwt from "jsonwebtoken";

// This middleware runs before protected route handlers.
// It checks that the request includes a valid JWT token.
// If valid, it attaches the decoded user info to req.user
// so the next handler knows who is making the request.
export function requireAuth(req, res, next) {
    // The token is sent in the Authorization header as: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Extract just the token part after "Bearer "
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // decoded contains { id, role, iat, exp }
        req.user = decoded;
        next(); // token is valid, continue to the route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

// Use this on routes that should only be accessible by admins
export function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
}
