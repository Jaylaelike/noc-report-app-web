import { getDb } from "~/db/db";
import { NextResponse } from "next/server";

import { users } from "~/db/schema/reportUsers";

export async function GET() {
  try {
    const result = await getDb();

    const records = await result
      ?.select({
        id_reporter: users.id_reporter,
        username_reporter: users.username_reporter,
      })
      .from(users)
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
