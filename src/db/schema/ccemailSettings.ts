import { mysqlTable, varchar, bigint } from "drizzle-orm/mysql-core";

//user id should be varchar 255

export const users = mysqlTable("ccemailsettings", {
  id_cc: bigint("id_cc", { mode: "number" }).primaryKey().autoincrement(),
  enterprise_cc: varchar("enterprise_cc", { length: 255 }).notNull(),
  customers_cc: varchar("username_cc", { length: 255 }).unique().notNull(),
  telphone_cc: varchar("telphone_cc", { length: 255 }).notNull(),
  emails_cc: varchar("emails_cc", { length: 255 }).notNull(),
});
