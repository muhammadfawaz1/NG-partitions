import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL!;

export async function POST(req: Request) {
  const { name, email, phone, company, projectType, message } = await req.json();

  try {
    // Email to owner
    await resend.emails.send({
      from: "noreply@ngpartitions.co.uk",
      to: OWNER_EMAIL, 
      subject: `New Enquiry — ${projectType} — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:8px;">
          <h2 style="color:#1A1A1A;margin-bottom:24px;">New Project Enquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:140px;">Name</td><td style="padding:8px 0;color:#1A1A1A;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;color:#1A1A1A;font-weight:600;">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;color:#1A1A1A;font-weight:600;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Company</td><td style="padding:8px 0;color:#1A1A1A;font-weight:600;">${company || "Not provided"}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Project Type</td><td style="padding:8px 0;color:#8B5E3C;font-weight:700;">${projectType}</td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#fff;border-left:3px solid #8B5E3C;border-radius:2px;">
            <p style="color:#666;font-size:12px;margin-bottom:8px;text-transform:uppercase;letter-spacing:.1em;">Message</p>
            <p style="color:#1A1A1A;line-height:1.7;margin:0;">${message}</p>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#999;">Sent from ngpartitions.co.uk contact form</p>
        </div>
      `,
    });

    // Confirmation email to user
    await resend.emails.send({
      from: "noreply@ngpartitions.co.uk",
      to: email,
      subject: "We've received your enquiry — N&G Partitions LTD",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <div style="background:#1A1A1A;padding:24px 32px;border-radius:6px 6px 0 0;">
            <h1 style="color:#C9A227;font-size:18px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin:0;">N&G Partitions LTD</h1>
          </div>
          <div style="background:#F4F0EA;padding:32px;border-radius:0 0 6px 6px;">
            <h2 style="color:#1A1A1A;font-weight:300;font-size:24px;margin-bottom:16px;">Hi ${name},</h2>
            <p style="color:#444;line-height:1.8;margin-bottom:16px;">
              Thank you for reaching out to N&G Partitions LTD. We've received your enquiry about
              <strong style="color:#8B5E3C;">${projectType}</strong> and will be in touch within 24 hours.
            </p>
            <p style="color:#444;line-height:1.8;margin-bottom:24px;">
              For urgent matters please call <strong>+44 7918 406766</strong> (Mon–Fri, 8am–6pm).
            </p>
            <div style="border-top:1px solid rgba(26,26,26,.1);padding-top:24px;margin-top:8px;">
              <p style="color:#888;font-size:13px;margin:0;">Kind regards,<br/><strong style="color:#1A1A1A;">The N&G Partitions Team</strong></p>
              <p style="color:#aaa;font-size:11px;margin-top:12px;">97 Whittlesey Road, Peterborough, PE2 8RW · ng.partitionsltd@gmail.com</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}