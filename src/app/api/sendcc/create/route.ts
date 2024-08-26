/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getDb } from "~/db/db";
import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";

import { users } from "~/db/schema/ccemailSettings";

// import WebSocket from 'ws'

interface CreateEmails {
  customers_cc: string;
  enterprise_cc: string;
  emails_cc: string;
  telphone_cc: string;
}

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const requestData: CreateEmails = await req.json();



  const db = await getDb();
  try {
    const record = db
      ?.insert(users)
      .values({
        customers_cc: requestData.customers_cc,
        enterprise_cc: "thaipbs",
        emails_cc: requestData.emails_cc,
        telphone_cc: "123456789",

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
