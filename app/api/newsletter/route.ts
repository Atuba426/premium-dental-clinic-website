import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Newsletter from "@/lib/models/Newsletter";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body ?? {};

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    await connectToDatabase();

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await Newsletter.findOne({ email: normalizedEmail });

    if (existing) {
      // Not an error from the user's point of view — they're already
      // subscribed, so this returns success rather than a 409/400 that
      // would read as a failure in the UI.
      return NextResponse.json({ success: true, alreadySubscribed: true }, { status: 200 });
    }

    const subscriber = new Newsletter({ email: normalizedEmail });
    await subscriber.save();

    return NextResponse.json({ success: true, alreadySubscribed: false }, { status: 201 });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again shortly." },
      { status: 500 }
    );
  }
}
