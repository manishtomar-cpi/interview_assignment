import mysql from "mysql2/promise";

//hold the connection pool
let pool;

//db connection function
export function db_connection() {
  if (!pool) {
    //if pool already not created
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_CONN_LIMIT } =
      process.env; // vars we need in db connection

    //validate the env
    if (
      !DB_HOST ||
      !DB_NAME ||
      !DB_PASSWORD ||
      !DB_USER ||
      !DB_CONN_LIMIT ||
      !DB_PORT
    ) {
      throw new Error("DB is missing in env");
    }

    //create pool
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: Number(DB_CONN_LIMIT || 10),
    });
    console.log("DB connected (pool created)");
  }
  return pool;
}

//close the connection
export async function closeDB() {
  if (pool) await pool.end();
  console.log("pool closed!");
}
