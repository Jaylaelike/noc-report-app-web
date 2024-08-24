/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getDb } from "~/db/db";
import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";

import { users } from "~/db/schema/emailSettings";

// import WebSocket from 'ws'

interface CreateEmails {
  enterprise: string;
  customers: string;
  telphone: string;
  emails: string;
}

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const requestData: CreateEmails = await req.json();

  const db = await getDb();
  try {
    const record = db
      ?.insert(users)
      .values({
        enterprise: requestData.enterprise,
        customers: requestData.customers,
        telphone: requestData.telphone,
        emails: requestData.emails,
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
