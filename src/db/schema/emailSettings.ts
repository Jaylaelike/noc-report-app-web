import { mysqlTable, varchar, bigint } from "drizzle-orm/mysql-core";

//user id should be varchar 255

export const users = mysqlTable("emailsettings", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  enterprise: varchar("enterprise", { length: 255 }).notNull(),
  customers: varchar("username", { length: 255 }).unique().notNull(),
  telphone: varchar("telphone", { length: 255 }).notNull(),
  emails: varchar("emails", { length: 255 }).notNull(),
});
