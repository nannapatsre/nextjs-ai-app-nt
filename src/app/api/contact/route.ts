import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'ข้อมูลไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_RECEIVER_EMAIL || 'admin@example.com',
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการส่งข้อมูล' },
      { status: 500 }
    );
  }
}
