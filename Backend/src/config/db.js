import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Creates a connection pool instead of a single connection.
// A pool manages multiple connections automatically,
// so we don't have to open/close a connection on every request.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // max 10 simultaneous connections
});

// Test the connection when the server starts so we know immediately
// if something is wrong with the DB credentials or config.
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to MariaDB successfully");
        connection.release(); // return the connection back to the pool
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // stop the server if DB is unreachable
    }
}

testConnection();

export default pool;
