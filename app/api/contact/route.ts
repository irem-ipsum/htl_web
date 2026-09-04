import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteContent } from "@/lib/data";

/**
 * Delivers the contact form to the club inbox.
 *
 * Set these in .env.local (see .env.example) and messages are sent for real.
 * Without them the route replies with reason "not_configured" and the form
 * falls back to opening the visitor's own mail app.
 */

const MAX = { name: 120, email: 200, subject: 160, message: 5000 };

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = clean(data.name, MAX.name);
  const email = clean(data.email, MAX.email);
  const subject = clean(data.subject, MAX.subject);
  const message = clean(data.message, MAX.message);

  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 422 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const to = process.env.CONTACT_TO || siteContent.email;
  const from = process.env.CONTACT_FROM || user;

  if (!host || !user || !pass) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Hack The Loop site" <${from}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `[${subject || "Website"}] message from ${name}`,
      text: `${message}\n\nFrom: ${name} <${email}>\nTopic: ${subject}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact form send failed:", error);
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }
}
