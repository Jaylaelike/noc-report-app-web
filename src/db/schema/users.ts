import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

//user id should be varchar 255

export const users = mysqlTable('users', {
    id: varchar('id', { length: 255 }).primaryKey(),
    username: varchar('username', { length: 255 }).unique().notNull(),
    role: varchar('role', { length: 255 }).notNull().default('user'),
    hashed_password: varchar('hashed_password', { length: 255 }).notNull(),
});
