const { Pool } = require('pg');
require('dotenv').config();

async function testConnection() {
  const connectionString = process.env.DATABASE_URL;
  console.log("🛠️ Testing direct PG connection...");
  console.log("  - DATABASE_URL present:", !!connectionString);
  console.log("  - First 10 chars:", connectionString?.substring(0, 10));

  if (!connectionString) {
    console.error("❌ ERROR: DATABASE_URL is not set in process.env");
    process.exit(1);
  }

  const pool = new Pool({ connectionString });

  try {
    const client = await pool.connect();
    console.log("✅ Successfully connected to PG directly!");
    const res = await client.query('SELECT NOW()');
    console.log("🕒 Result from DB:", res.rows[0]);
    client.release();
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection failed!");
    console.error(err);
    process.exit(1);
  }
}

testConnection();
