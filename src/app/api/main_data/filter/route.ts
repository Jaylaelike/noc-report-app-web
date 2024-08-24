import { NextRequest, NextResponse } from "next/server";

import { between, desc, eq } from "drizzle-orm";

import { getDb } from "~/db/db";

import { users } from "~/db/schema/maindb";

//create get params  by Datetime between Start and End exam /api/sessions/filter?start=2022-01-01&end=2022-01-31
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const start = new Date(searchParams.get("start"));
  const end = new Date(searchParams.get("end"));

  //   const startDate = new Date('2024-09-05');
  // const endDate = new Date('2024-09-06');

  try {
    const result = await getDb();

    const sessionData = await result
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
      .where(between(users.DowntimeStart, start, end))
      .orderBy(desc(users.createdAt))
      .execute();

    if (!result) {
      return NextResponse.json(
        { message: "could not get database connection" },
        { status: 500 },
      );
    }

    return NextResponse.json(sessionData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "could not get users" },
      { status: 500 },
    );
  }
}
