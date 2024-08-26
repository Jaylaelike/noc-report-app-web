import { getDb } from "~/db/db";
import { NextResponse } from "next/server";

import { users } from "~/db/schema/ccemailSettings";

export async function GET() {
  try {
    const result = await getDb();

    const records = await result
      ?.select({
        id_cc: users.id_cc,
        customers_cc: users.customers_cc,
        emails_cc: users.emails_cc,
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
