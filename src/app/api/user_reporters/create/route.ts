/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getDb } from "~/db/db";
import { NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs/server";

import { users } from "~/db/schema/reportUsers";

// import WebSocket from 'ws'

interface CreatUsers {
  username_reporter: string;
}

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const requestData: CreatUsers = await req.json();

  const db = await getDb();
  try {
    const record = db
      ?.insert(users)
      .values({
        username_reporter: requestData.username_reporter,
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
