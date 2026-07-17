import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/lib/models/Contact";

// Basic email shape check. Not a full RFC 5322 validator — that's rarely
// worth the false-positive rate — just enough to reject obvious junk.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body ?? {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    await connectToDatabase();

    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: typeof phone === "string" ? phone.trim() : undefined,
      message: message.trim(),
    });
    await contact.save();

    return NextResponse.json(
      { success: true, id: contact._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again shortly." },
      { status: 500 }
    );
  }
}
