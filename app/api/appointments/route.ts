import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Appointment, { SERVICE_OPTIONS, IAppointment } from "@/lib/models/appointment";
import { sendAppointmentConfirmationEmail, sendAppointmentNotificationToClinic } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIME_OPTIONS = ["Morning", "Afternoon", "Evening"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, preferredDate, preferredTime, notes } = body ?? {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }
    if (!SERVICE_OPTIONS.includes(service)) {
      return NextResponse.json({ error: "Please select a valid service." }, { status: 400 });
    }
    if (!preferredDate || typeof preferredDate !== "string") {
      return NextResponse.json({ error: "A preferred date is required." }, { status: 400 });
    }
    // Reject past dates server-side — client-side min= on the date input
    // is a UX hint only and can't be trusted.
    const chosenDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(chosenDate.getTime()) || chosenDate < today) {
      return NextResponse.json({ error: "Preferred date must be today or later." }, { status: 400 });
    }
    if (!TIME_OPTIONS.includes(preferredTime)) {
      return NextResponse.json({ error: "Please select a valid time window." }, { status: 400 });
    }

    await connectToDatabase();

    const appointment = new Appointment({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service as IAppointment["service"],
      preferredDate,
      preferredTime: preferredTime as IAppointment["preferredTime"],
      notes: typeof notes === "string" ? notes.trim() : undefined,
    });
    await appointment.save();

    // The booking is already safely persisted above — if email sending
    // fails (bad API key, provider outage, etc.) the patient should still
    // get a success response rather than believing their request was lost.
    // Errors are logged for visibility instead of surfaced to the user.
    const emailPayload = {
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      service: appointment.service,
      preferredDate: appointment.preferredDate,
      preferredTime: appointment.preferredTime,
      notes: appointment.notes,
    };

    const [confirmationResult, notificationResult] = await Promise.allSettled([
      sendAppointmentConfirmationEmail(emailPayload),
      sendAppointmentNotificationToClinic(emailPayload),
    ]);

    if (confirmationResult.status === "rejected") {
      console.error("Failed to send patient confirmation email:", confirmationResult.reason);
    }
    if (notificationResult.status === "rejected") {
      console.error("Failed to send clinic notification email:", notificationResult.reason);
    }

    return NextResponse.json({ success: true, id: appointment._id }, { status: 201 });
  } catch (error) {
    console.error("Appointment API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again shortly." },
      { status: 500 }
    );
  }
}
