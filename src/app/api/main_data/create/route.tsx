/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getDb } from "~/db/db";
import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";

import { users } from "~/db/schema/maindb";
import { DatetimeFsp } from "drizzle-orm/mysql-core";

interface CreatData {
  Site: string;
  FacilityProvider: string;
  EngineeringCenter: string;
  PostingDate: DatetimeFsp;
  DowntimeStart: DatetimeFsp;
  DowntimeEnd: DatetimeFsp;
  DowntimeTotal: string;
  Detail: string;
  JobTickets: string;
  Reporter: string;
  Approver: string;
  Remark: string;
}

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const requestData: CreatData = await req.json();

  const db = await getDb();
  try {
    const record = db
      ?.insert(users)
      .values({
        Site: requestData.Site,
        FacilityProvider: requestData.FacilityProvider,
        EngineeringCenter: requestData.EngineeringCenter,
        PostingDate: new Date(
          new Date(requestData.PostingDate).getTime() + 7 * 60 * 60 * 1000,
        ),
        DowntimeStart: new Date(
          new Date(requestData.DowntimeStart).getTime() + 7 * 60 * 60 * 1000,
        ),

        DowntimeEnd: new Date(
          new Date(requestData.DowntimeEnd).getTime() + 7 * 60 * 60 * 1000,
        ),
        DowntimeTotal: requestData.DowntimeTotal,
        Detail: requestData.Detail,
        JobTickets: requestData.JobTickets,
        Reporter: requestData.Reporter,
        Approver: requestData.Approver,
        Remark: requestData.Remark,
      })
      .execute();

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    return NextResponse.error(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
