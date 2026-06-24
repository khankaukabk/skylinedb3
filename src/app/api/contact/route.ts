import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, project_scope, message } = body;

        const data = await resend.emails.send({
            from: 'SkylineDB3 Contact <onboarding@resend.dev>', // Update this once your domain is verified in Resend
            to: 'info@skylinedb3.com',
            subject: `New Project Commission: ${name}`,
            html: `
        <h2>New Project Commission Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Scope:</strong> ${project_scope}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}