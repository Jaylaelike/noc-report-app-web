import { getDb } from "~/db/db";
import { NextResponse } from "next/server";

import { users } from "~/db/schema/maindb";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const result = await getDb();

    // id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    // Site: varchar("Site", { length: 255 }).notNull(),
    // FacilityProvider: varchar("FacilityProvider", { length: 255 }).notNull(),
    // EngineeringCenter: varchar("EngineeringCenter", { length: 255 }).notNull(),
    // PostingDate: datetime("PostingDate").notNull(),
    // DowntimeStart: datetime("DowntimeStart").notNull(),
    // DowntimeEnd: datetime("DowntimeEnd").notNull(),
    // DowntimeTotal: varchar("DowntimeTotal", { length: 255 }).notNull(),
    // Detail: varchar("Detail", { length: 255 }).notNull(),
    // JobTickets: varchar("JobTickets", { length: 255 }).notNull(),
    // Reporter: varchar("Reporter", { length: 255 }).notNull(),
    // Approver: varchar("Approver", { length: 255 }).notNull(),
    // Remark: varchar("Remark", { length: 255 }).notNull(),
    // createdAt: datetime("created_at")
    //   .default(sql`CURRENT_TIMESTAMP`)
    //   .notNull(),
    // updatedAt: datetime("updatedAt"),

    const records = await result
      ?.select({
        id: users.id,
        Site: users.Site,
        FacilityProvider: users.FacilityProvider,
        EngineeringCenter: users.EngineeringCenter,
        PostingDate: users.PostingDate,
        DowntimeStart: users.DowntimeStart,
        DowntimeEnd: users.DowntimeEnd,
        DowntimeTotal: users.DowntimeTotal,
        Detail: users.Detail,
        JobTickets: users.JobTickets,
        Reporter: users.Reporter,
        Approver: users.Approver,
        Remark: users.Remark,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .orderBy( desc(users.createdAt))
      .execute();

    if (!result) {
      return NextResponse.json(
        { message: "could not get database connection" },
        { status: 500 },
      );
    }

    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "could not get users" },
      { status: 500 },
    );
  }
}
