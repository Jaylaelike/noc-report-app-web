//create POST route for send line notify message
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    const record = await fetch("https://notify-api.line.me/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer GEGDPSqJ8Kzxb9XOeTVjCXXL7hqkpNaY1KREhr2zVkJ`,
      },
      body: `message=${message}`,
    });

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
