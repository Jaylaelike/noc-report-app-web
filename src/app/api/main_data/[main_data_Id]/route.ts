/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { eq } from "drizzle-orm";

import { getDb } from "~/db/db";
import { NextResponse } from "next/server";

import { users } from "~/db/schema/maindb";
import { DatetimeFsp } from "drizzle-orm/mysql-core/columns/datetime";

interface contextProps {
  params: {
    main_data_Id: number;
  };
}

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

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;

    const post = await getDb();
    await post
      ?.delete(users)
      .where(eq(users.id, params.main_data_Id))
      .execute();

    return NextResponse.json(
      { message: `delete id ${params.main_data_Id} success` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "could not delete post" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;

    const body: CreatData = await req.json();

    const post = await getDb();
    await post
      ?.update(users)
      .set({
        Site: body.Site,
        FacilityProvider: body.FacilityProvider,
        EngineeringCenter: body.EngineeringCenter,
        PostingDate: new Date(
          new Date(body.PostingDate).getTime() + 7 * 60 * 60 * 1000,
        ),
        DowntimeStart: new Date(
          new Date(body.DowntimeStart).getTime() + 7 * 60 * 60 * 1000,
        ),

        DowntimeEnd: new Date(
          new Date(body.DowntimeEnd).getTime() + 7 * 60 * 60 * 1000,
        ),

        DowntimeTotal: body.DowntimeTotal,
        Detail: body.Detail,
        JobTickets: body.JobTickets,
        Reporter: body.Reporter,
        Approver: body.Approver,
        Remark: body.Remark,
      })
      .where(eq(users.id, params.main_data_Id))
      .execute();

    return NextResponse.json(
      { message: `update id ${params.main_data_Id} success` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "could not update post" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const post = await getDb();
    const results = await post
      ?.select({
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
      })
      .from(users)
      .where(eq(users.id, params.main_data_Id))
      .execute();

    return NextResponse.json(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "could not get records" },
      { status: 500 },
    );
  }
}
