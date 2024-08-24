import { validateRequest } from "~/auth/validateRequest";

import { redirect } from "next/navigation";

import { getDb } from "~/db/db";

import { eq } from "drizzle-orm";
import { users } from "~/db/schema/users";
import MainForm from "~/components/MainForm";

export default async function Home() {
  const { user, session } = await validateRequest();

  if (!user) {
    return redirect("/signin");
  }

  //get image url from db
  const db = await getDb();

  const roles = await db?.select().from(users).where(eq(users.id, user.id));

  console.log(roles);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <MainForm />
    </main>
  );
}
