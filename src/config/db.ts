import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// إذا وجدنا DATABASE_URL (عند الرفع على Vercel أو Neon)، نستخدمه مباشرة
// وإذا لم يوجد (محلياً على جهازك)، نستخدم المتغيرات المنفصلة
export const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false, // مخصص للاتصال الآمن بـ Neon
        },
      }
    : {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "mydb2",
      }
);

/**
 * Initializes the database:
 * 1. Verifies the connection to PostgreSQL.
 * 2. Creates the 'users' table if it does not already exist.
 * 3. Seeds initial demo records if the table is empty.
 */
export async function initDb(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log(`✅ [Database] Connected successfully to PostgreSQL database!`);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        region VARCHAR(100) NOT NULL DEFAULT 'USA',
        job_title_name VARCHAR(100),
        preferred_full_name VARCHAR(150),
        employee_code VARCHAR(50),
        phone_number VARCHAR(50),
        email_address VARCHAR(150),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await client.query(createTableQuery);

    // Check if table is empty to seed initial demo data
    const countRes = await client.query("SELECT COUNT(*) AS count FROM users");
    const count = Number(countRes.rows[0].count);

    if (count === 0) {
      const seedQuery = `
        INSERT INTO users (first_name, last_name, region, job_title_name, preferred_full_name, employee_code, phone_number, email_address)
        VALUES 
          ('Romin', 'Irani', 'USA', 'Developer', 'Romin Irani', 'E1', '408-1234567', 'romin.k@gmail.com'),
          ('Neil', 'Irani', 'USA', 'Developer', 'Neil Irani', 'E2', '408-1111111', 'neilrira@gmail.com'),
          ('Tom', 'Hanks', 'USA', 'Program Directory', 'Tom Hanks', 'E3', '408-2222222', 'tomanks@gmail.com');
      `;
      await client.query(seedQuery);
      console.log(
        "🌱 [Database] Seeded initial sample users into 'users' table."
      );
    }

    client.release();
    console.log("🚀 [Database] 'users' table is ready.");
  } catch (error: any) {
    console.error("❌ [Database] Connection error:", error.message);
    console.warn(
      "⚠️ Please check your database connection string or credentials."
    );
  }
}

let dbInitPromise: Promise<void> | null = null;

/**
 * Ensures the database schema and initial data are ready.
 * Safe for serverless environments (e.g. Vercel) where app.listen is not called.
 */
export async function ensureDb(): Promise<void> {
  if (!dbInitPromise) {
    dbInitPromise = initDb().catch((err) => {
      dbInitPromise = null;
      throw err;
    });
  }
  return dbInitPromise;
}
