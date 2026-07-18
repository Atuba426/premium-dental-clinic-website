"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";

const SERVICES = [
  "Cosmetic Dentistry",
  "Teeth Whitening",
  "Preventive Care",
  "Restorative Dentistry",
  "Family Dentistry",
  "Dental Implants",
];

const TIME_WINDOWS = ["Morning", "Afternoon", "Evening"];

type Status = "idle" | "submitting" | "success" | "error";

// Today's date in YYYY-MM-DD, used as the date input's min= so the native
// picker can't offer past dates (server also re-validates this).
function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function Booking() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="booking" aria-labelledby="booking-heading" className="py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="Book Appointment"
          title={<span id="booking-heading">Reserve your visit in under a minute</span>}
          subtitle="Choose a service and a preferred window — our team will confirm the exact time by phone or email."
        />

        <form
          onSubmit={handleSubmit}
          className="glass mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-3xl p-7 sm:p-9"
          noValidate
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="booking-name" className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                id="booking-name"
                name="name"
                type="text"
                required
                aria-required="true"
                className="rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary"
                placeholder="Jane Cooper"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="booking-phone" className="text-sm font-medium text-foreground">
                Phone Number
              </label>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                required
                aria-required="true"
                className="rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="booking-email" className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <input
              id="booking-email"
              name="email"
              type="email"
              required
              aria-required="true"
              className="rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary"
              placeholder="jane@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="booking-service" className="text-sm font-medium text-foreground">
              Service
            </label>
            <select
              id="booking-service"
              name="service"
              required
              aria-required="true"
              defaultValue=""
              className="rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-foreground focus:border-primary"
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((service) => (
                <option key={service} value={service} className="bg-background">
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="booking-date" className="text-sm font-medium text-foreground">
                Preferred Date
              </label>
              <input
                id="booking-date"
                name="preferredDate"
                type="date"
                required
                aria-required="true"
                min={todayISO()}
                className="rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-foreground focus:border-primary scheme-dark"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="booking-time" className="text-sm font-medium text-foreground">
                Preferred Time
              </label>
              <select
                id="booking-time"
                name="preferredTime"
                required
                aria-required="true"
                defaultValue=""
                className="rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-foreground focus:border-primary"
              >
                <option value="" disabled>
                  Select a window
                </option>
                {TIME_WINDOWS.map((window) => (
                  <option key={window} value={window} className="bg-background">
                    {window}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="booking-notes" className="text-sm font-medium text-foreground">
              Notes <span className="text-muted">(optional)</span>
            </label>
            <textarea
              id="booking-notes"
              name="notes"
              rows={3}
              className="resize-none rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary"
              placeholder="Anything we should know before your visit?"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === "submitting"}
            className="w-full sm:w-fit"
          >
            {status === "submitting" ? "Booking..." : "Request Appointment"}
          </Button>

          <p role="status" aria-live="polite" className="text-sm">
            {status === "success" && (
              <span className="text-primary-light">
                Request received — we&apos;ll confirm your appointment shortly by phone or email.
              </span>
            )}
            {status === "error" && <span className="text-red-400">{errorMessage}</span>}
          </p>
        </form>
      </Container>
    </section>
  );
}
