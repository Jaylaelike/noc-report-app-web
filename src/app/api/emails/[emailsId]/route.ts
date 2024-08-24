/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { eq } from "drizzle-orm";

import { getDb } from "~/db/db";
import { NextResponse } from "next/server";

import { users } from "~/db/schema/emailSettings";

interface contextProps {
  params: {
    emailsId: number;
  };
}
interface CreateEmails {
  enterprise: string;
  customers: string;
  telphone: string;
  emails: string;
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;

    const post = await getDb();
    await post?.delete(users).where(eq(users.id, params.emailsId)).execute();

    return NextResponse.json(
      { message: `delete id ${params.emailsId} success` },
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

    const body: CreateEmails = await req.json();

    const post = await getDb();
    await post
      ?.update(users)
      .set({
        enterprise: body.enterprise,
        customers: body.customers,
        emails: body.emails,
        telphone: body.telphone,
      })
      .where(eq(users.id, params.emailsId))
      .execute();

    return NextResponse.json(
      { message: `update id ${params.emailsId} success` },
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
        id: users.id,
        enterprise: users.enterprise,
        customers: users.customers,
        telphone: users.telphone,
        emails: users.emails,
      })
      .from(users)
      .where(eq(users.id, params.emailsId))
      .execute();

    return NextResponse.json(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "could not get records" },
      { status: 500 },
    );
  }
}
