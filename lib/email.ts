import { Resend } from "resend";
import type { IAppointment } from "@/lib/models/appointment";

// Lazily instantiated so a missing RESEND_API_KEY only breaks the paths
// that actually try to send email, not every import of this module
// (e.g. during build, when no request is being handled).
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  return new Resend(apiKey);
}

type AppointmentEmailData = Pick<
  IAppointment,
  "name" | "email" | "phone" | "service" | "preferredDate" | "preferredTime"
> & { notes?: string };

const FROM_ADDRESS = process.env.EMAIL_FROM ?? "EverSmile Dental Care <onboarding@resend.dev>";
const CLINIC_INBOX = process.env.CLINIC_NOTIFICATION_EMAIL;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

// User-supplied strings (name, notes, etc.) get interpolated directly into
// HTML email bodies below — escape them so a submission can't inject markup
// into the rendered email.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Sent to the patient confirming their request was received. */
export async function sendAppointmentConfirmationEmail(data: AppointmentEmailData) {
  const resend = getResendClient();

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: data.email,
    subject: "We've received your appointment request — EverSmile Dental Care",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1e293b;">
        <h2 style="color: #0f9488;">Thanks, ${escapeHtml(data.name)} — your request is in.</h2>
        <p>We've received your appointment request and our team will confirm the exact time shortly by phone or email.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 6px 0; color: #64748b;">Service</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(data.service)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Preferred date</td><td style="padding: 6px 0; font-weight: 600;">${formatDate(data.preferredDate)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Preferred time</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(data.preferredTime)}</td></tr>
        </table>
        <p style="color: #64748b; font-size: 14px;">If anything above isn't right, just reply to this email or call us at +1 (555) 123-4567.</p>
        <p style="color: #64748b; font-size: 14px;">— EverSmile Dental Care</p>
      </div>
    `,
  });
}

/** Sent to the clinic's own inbox so staff can act on the new request. */
export async function sendAppointmentNotificationToClinic(data: AppointmentEmailData) {
  if (!CLINIC_INBOX) {
    // Not fatal — the patient confirmation email still matters more —
    // but worth knowing about, so this is logged rather than silently skipped.
    console.warn("CLINIC_NOTIFICATION_EMAIL not set — skipping internal notification email.");
    return;
  }

  const resend = getResendClient();

  await resend.emails.send({
    from: FROM_ADDRESS,
    to: CLINIC_INBOX,
    subject: `New appointment request: ${data.name} — ${data.service}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1e293b;">
        <h2 style="color: #0f9488;">New appointment request</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 6px 0; color: #64748b;">Name</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Email</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(data.email)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Phone</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(data.phone)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Service</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(data.service)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Preferred date</td><td style="padding: 6px 0; font-weight: 600;">${formatDate(data.preferredDate)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Preferred time</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(data.preferredTime)}</td></tr>
          ${data.notes ? `<tr><td style="padding: 6px 0; color: #64748b;">Notes</td><td style="padding: 6px 0;">${escapeHtml(data.notes)}</td></tr>` : ""}
        </table>
      </div>
    `,
  });
}
