import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL!;

/* ─── Shared design tokens ─────────────────────────────────────────── */
const INK   = "#1A1A1A";
const OAK   = "#8B5E3C";
const GOLD  = "#C9A227";
const CREAM = "#F4F0EA";
const RULE  = "#E8E0D4";
const MUTED = "#7A7060";

/* ─── Reusable shell ────────────────────────────────────────────────── */
function shell(inner: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>N&amp;G Partitions LTD</title>
<style>a { color: inherit !important; text-decoration: none !important; }</style>
</head>
<body style="margin:0;padding:0;background:#EDEAE4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#EDEAE4;padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- HEADER -->
      <tr>
        <td style="background:${INK};padding:28px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="display:inline-block;width:3px;height:18px;background:${GOLD};vertical-align:middle;margin-right:12px;"></span>
                <span style="color:${GOLD};font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;vertical-align:middle;">N&amp;G Partitions LTD</span>
              </td>
              <td align="right">
                <span style="color:rgba(255,255,255,.25);font-size:10px;letter-spacing:.12em;text-transform:uppercase;">ngpartitions.co.uk</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td style="background:#FDFCFA;padding:48px 40px 40px;">
          ${inner}
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="background:${INK};padding:24px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="color:rgba(255,255,255,.35);font-size:10px;letter-spacing:.1em;text-transform:uppercase;margin:0 0 6px;">N&amp;G Partitions LTD</p>
                <p style="color:rgba(255,255,255,.2);font-size:10px;margin:0;line-height:1.7;">
                  97 Whittlesey Road, Peterborough, PE2 8RW<br/>
                  ng.partitionsltd@gmail.com &nbsp;·&nbsp; +44 7918 406766
                </p>
              </td>
<td></td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/* ─── Label/value row helper ────────────────────────────────────────── */
function row(label: string, value: string, highlight = false) {
  return `
  <tr>
    <td style="padding:12px 16px;border-bottom:1px solid ${RULE};width:130px;vertical-align:top;">
      <span style="font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${MUTED};">${label}</span>
    </td>
    <td style="padding:12px 16px;border-bottom:1px solid ${RULE};vertical-align:top;">
      <span style="font-size:13px;font-weight:600;color:${highlight ? OAK : INK};">${value}</span>
    </td>
  </tr>`;
}

/* ─── OWNER EMAIL ───────────────────────────────────────────────────── */
function ownerHtml(name: string, email: string, phone: string, company: string, projectType: string, message: string) {
  return shell(`
    <!-- eyebrow -->
    <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${OAK};">New Enquiry</p>
    <h1 style="margin:0 0 32px;font-size:26px;font-weight:300;color:${INK};letter-spacing:-.02em;line-height:1.15;">
      Project enquiry<br/>from <strong style="font-weight:700;">${name}</strong>
    </h1>

    <!-- divider -->
    <div style="height:1px;background:${RULE};margin-bottom:24px;"></div>

    <!-- details table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${RULE};border-radius:4px;border-collapse:collapse;margin-bottom:32px;">
      ${row("Name",         name)}
      ${row("Email",        email)}
      ${row("Phone",        phone    || "Not provided")}
      ${row("Company",      company  || "Not provided")}
      ${row("Project Type", projectType, true)}
    </table>

    <!-- message block -->
    <p style="margin:0 0 10px;font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${MUTED};">Project Brief</p>
    <div style="background:${CREAM};border-left:3px solid ${OAK};padding:20px 24px;border-radius:0 4px 4px 0;margin-bottom:36px;">
      <p style="margin:0;font-size:14px;line-height:1.85;color:${INK};">${message}</p>
    </div>

    <!-- CTA -->
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="background:${OAK};border-radius:3px;">
          <a href="mailto:${email}" style="display:inline-block;padding:14px 28px;color:#fff;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;">
            Reply to ${name} →
          </a>
        </td>
      </tr>
    </table>

    <p style="margin:28px 0 0;font-size:11px;color:rgba(26,26,26,.3);letter-spacing:.06em;">Sent via ngpartitions.co.uk contact form</p>
  `);
}

/* ─── CUSTOMER CONFIRMATION EMAIL ───────────────────────────────────── */
function customerHtml(name: string, projectType: string) {
  return shell(`
    <!-- eyebrow -->
    <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${OAK};">Enquiry Confirmed</p>
    <h1 style="margin:0 0 24px;font-size:26px;font-weight:300;color:${INK};letter-spacing:-.02em;line-height:1.2;">
      Thank you,<br/><strong style="font-weight:700;">${name}.</strong>
    </h1>

    <div style="height:1px;background:${RULE};margin-bottom:28px;"></div>

    <p style="margin:0 0 28px;font-size:14px;line-height:1.85;color:${MUTED};">
      We've received your enquiry regarding
      <strong style="color:${OAK};font-weight:700;">${projectType}</strong>.
      A member of our team will be in touch within <strong style="color:${INK};">24 hours</strong>.
    </p>

    <!-- 3 simple steps — one line each, no descriptions -->
    <div style="background:${CREAM};border-radius:4px;padding:24px 28px;margin-bottom:32px;">
      <p style="margin:0 0 18px;font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${MUTED};">What happens next</p>
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding-bottom:14px;">
            <span style="font-size:9px;font-weight:700;color:${OAK};letter-spacing:.1em;margin-right:12px;">01</span>
            <span style="font-size:13px;font-weight:600;color:${INK};">We review your enquiry</span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:14px;border-top:1px solid ${RULE};padding-top:14px;">
            <span style="font-size:9px;font-weight:700;color:${OAK};letter-spacing:.1em;margin-right:12px;">02</span>
            <span style="font-size:13px;font-weight:600;color:${INK};">A specialist calls you within 24 hours</span>
          </td>
        </tr>
        <tr>
          <td style="border-top:1px solid ${RULE};padding-top:14px;">
            <span style="font-size:9px;font-weight:700;color:${OAK};letter-spacing:.1em;margin-right:12px;">03</span>
            <span style="font-size:13px;font-weight:600;color:${INK};">We send a clear, no-obligation quote</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- urgent contact -->
    <div style="border:1px solid ${RULE};border-radius:4px;padding:18px 24px;margin-bottom:8px;">
      <p style="margin:0;font-size:13px;color:${INK};">
        Need to speak sooner? Call <strong>+44 7918 406766</strong>
        <span style="color:${MUTED};font-size:12px;"> &nbsp;Mon–Fri, 8am–6pm</span>
      </p>
    </div>

    <p style="margin:28px 0 0;font-size:12px;line-height:1.7;color:rgba(26,26,26,.35);">
      Kind regards,<br/>
      <strong style="color:${INK};font-size:13px;">The N&amp;G Partitions Team</strong>
    </p>
  `);
}

/* ─── Route handler ─────────────────────────────────────────────────── */
export async function POST(req: Request) {
  const { name, email, phone, company, projectType, message } = await req.json();

  try {
    await resend.emails.send({
      from: "noreply@ngpartitions.co.uk",
      to: OWNER_EMAIL,
      subject: `New Enquiry — ${projectType} — ${name}`,
      html: ownerHtml(name, email, phone, company, projectType, message),
    });

    await resend.emails.send({
      from: "noreply@ngpartitions.co.uk",
      to: email,
      subject: "We've received your enquiry — N&G Partitions LTD",
      html: customerHtml(name, projectType),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}






