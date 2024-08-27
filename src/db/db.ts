
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

export const dbConfig = {
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  port: Number(process.env.DB_PORT) as number,
  waitForConnections: true,
  connectionLimit: 5000, // Adjust this value based on your needs
};



const pool = mysql.createPool({
 ...dbConfig,
  waitForConnections: true,
  connectionLimit: 5000, // Adjust this value based on your needs
  queueLimit: 0,
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  enableKeepAlive: true,
  keepAliveInitialDelay: 0, // initial delay for TCP Keep-Alive packets, in milliseconds, the default value 30000
});

//   // connectionLimit: 100,
// });

// let pool: mysql.Pool | null = null;

// const getPool = (): mysql.Pool => {
//   if (!pool) {
//     pool = mysql.createPool({
//       ...dbConfig,
//       waitForConnections: true,
//       connectionLimit: 10, // Adjust this value based on your needs
//       queueLimit: 0,
//       idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//       enableKeepAlive: true,
//       keepAliveInitialDelay: 0, // initial delay for TCP Keep-Alive packets, in milliseconds, the default value 30000
//     });
//   }
//   return pool;
// };

// export default getPool;

export const getDb = async (): Promise<MySql2Database<
  Record<string, never>
> | null> => {
  try {
    const connection = await pool.getConnection();
    const db = drizzle(connection);
    return db;
  } catch (error) {
    console.error("Error while getting database:", error);
    return null;
  }
};

export const closeDb = async (): Promise<void> => {
  try {
    await pool.end();
    console.log("Database connection pool closed.");
  } catch (error) {
    console.error("Error while closing database connection pool:", error);
  }
};

// import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
// import mysql from "mysql2/promise";

// export const dbConfig = {
//   host: process.env.DB_HOST!,
//   user: process.env.DB_USER!,
//   password: process.env.DB_PASSWORD!,
//   database: process.env.DB_NAME!,
//   port: Number(process.env.DB_PORT) as number,
//   waitForConnections: true,
//   timezone: "utc",
// };

// // Singleton function to ensure only one db instance is created
// function singleton<Value>(name: string, value: () => Value): Value {
//   const globalAny: any = global;
//   globalAny.__singletons = globalAny.__singletons || {};

//   if (!globalAny.__singletons[name]) {
//     globalAny.__singletons[name] = value();
//   }

//   return globalAny.__singletons[name];
// }

// // Function to create the database connection pool
// function createDatabaseConnectionPool() {
//   return mysql.createPool({
//     ...dbConfig,
//     // connectionLimit: 100,
//   });
// }

// // Create a singleton instance of the connection pool
// const pool = singleton('dbPool', createDatabaseConnectionPool);

// export const getDb = async (): Promise<MySql2Database<Record<string, never>> | null> => {
//   try {
//     const connection = await pool.getConnection();
//     const db = drizzle(connection);
//     return db;
//   } catch (error) {
//     console.error("Error while getting database:", error);
//     return null;
//   }
// };

// export const closeDb = async (): Promise<void> => {
//   try {
//     await pool.end();
//     console.log("Database connection pool closed.");
//   } catch (error) {
//     console.error("Error while closing database connection pool:", error);
//   }
// };
