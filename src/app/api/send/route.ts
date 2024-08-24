import { EmailTemplate } from '~/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'sittichaim@thaipbs.or.th',
      to: ['smarkwisai@gmail.com'],
      subject: 'Hello world',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      react: EmailTemplate({ firstName: 'Thaipbs Test NOC' }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
