import { mysqlTable, varchar, bigint } from "drizzle-orm/mysql-core";

//user id should be varchar 255

export const users = mysqlTable("reporters", {
  id_reporter: bigint("id_reporter", { mode: "number" }).primaryKey().autoincrement(),
  username_reporter: varchar("username_reporter", { length: 255 }).unique().notNull(),
});
