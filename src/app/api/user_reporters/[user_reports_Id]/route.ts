/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { users } from "~/server/db/schema";
// import { db } from "~/server/db/index";
// import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getDb } from "~/db/db";
import { NextResponse } from "next/server";

import { users } from "~/db/schema/reportUsers";

interface contextProps {
  params: {
    user_reports_Id: number;
  };
}

interface CreateRepoertsUsers {
  username_reporter: string;
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;

    const post = await getDb();
    await post
      ?.delete(users)
      .where(eq(users.id_reporter, params.user_reports_Id))
      .execute();

    return NextResponse.json(
      { message: `delete id ${params.user_reports_Id} success` },
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

    const body: CreateRepoertsUsers = await req.json();

    const post = await getDb();
    await post
      ?.update(users)
      .set({
        username_reporter: body.username_reporter,
      })
      .where(eq(users.id_reporter, params.user_reports_Id))
      .execute();

    return NextResponse.json(
      { message: `update id ${params.user_reports_Id} success` },
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
        id_reporter: users.id_reporter,
        username_reporter: users.username_reporter,
      })
      .from(users)
      .where(eq(users.id_reporter, params.user_reports_Id))
      .execute();

    return NextResponse.json(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "could not get records" },
      { status: 500 },
    );
  }
}
