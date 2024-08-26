/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { users } from "~/server/db/schema";
// import { db } from "~/server/db/index";
// import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { getDb } from "~/db/db";
import { NextResponse } from "next/server";

import { users } from "~/db/schema/ccemailSettings";

interface contextProps {
  params: {
    send_cc_Id: number;
  };
}

interface CreateRepoertsUsers {
    customers_cc: string;
    emails_cc: string;
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;

    const post = await getDb();
    await post
      ?.delete(users)
      .where(eq(users.id_cc, params.send_cc_Id))
      .execute();

    return NextResponse.json(
      { message: `delete id ${params.send_cc_Id} success` },
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
        customers_cc: body.customers_cc,
        emails_cc: body.emails_cc
      })
      .where(eq(users.id_cc, params.send_cc_Id))
      .execute();

    return NextResponse.json(
      { message: `update id ${params.send_cc_Id} success` },
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
        customers_cc: users.customers_cc,
        emails_cc: users.emails_cc,
      })
      .from(users)
      .where(eq(users.id_cc, params.send_cc_Id))
      .execute();

    return NextResponse.json(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "could not get records" },
      { status: 500 },
    );
  }
}
