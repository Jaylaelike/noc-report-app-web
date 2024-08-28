import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";

import { EmailTemplates } from "~/components/EmailTemplete";


export async function POST(request: { json: () => PromiseLike<{ subject: any; message: any; }> | { subject: any; message: any; }; }) {
  try {
    const { subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "webmail.thaipbs.or.th",
      port: 587,
      secure: true,
      auth: {
        user: "NOCadmin@thaipbs.or.th",
        pass: "noctpbs",
      },
    });


    const mailOption = {
      from: "NOCadmin@thaipbs.or.th",
      to: "sittichaim@thaipbs.or.th",
      subject: "NOC Downtime Report",
      html: `
        <h1>${subject}</h1>
        <p>${message}</p>
        `,

    };

  
    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 },
    );
  }
}
