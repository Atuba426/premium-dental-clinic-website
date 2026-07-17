"use client";

import { FormEvent, useState } from "react";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";

const HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
  { day: "Saturday", time: "9:00 AM – 3:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  // No backend endpoint was specified, so this simulates a submission.
  // Wire this up to a real API route (e.g. app/api/contact/route.ts) or a
  // form service before going to production.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 900);
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="Contact"
          title={<span id="contact-heading">Let&apos;s get your visit scheduled</span>}
          subtitle="Reach out directly or send us a message — we typically respond within one business day."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="glass flex flex-col gap-5 rounded-3xl p-7">
              <div className="flex items-start gap-3">
                <HiOutlineMapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Visit Us</span>
                  <span className="text-sm text-muted">128 Maple Grove Avenue, Suite 4</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlinePhone className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Call Us</span>
                  <a href="tel:+15551234567" className="text-sm text-muted hover:text-white">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineEnvelope className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Email Us</span>
                  <a href="mailto:hello@eversmiledental.example" className="text-sm text-muted hover:text-white">
                    hello@eversmiledental.example
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiOutlineClock className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-white">Working Hours</span>
                  <dl className="flex flex-col gap-0.5">
                    {HOURS.map((h) => (
                      <div key={h.day} className="flex justify-between gap-4 text-sm text-muted">
                        <dt>{h.day}</dt>
                        <dd>{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <Button
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
                icon={<FaWhatsapp className="h-4 w-4" aria-hidden="true" />}
                className="mt-1 w-full"
              >
                Chat on WhatsApp
              </Button>
            </div>

            {/*
              Real map integration: replace with
              <iframe src="https://www.google.com/maps/embed?..." loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" className="h-full w-full" />
              Deferred for now so no third-party script loads before it's needed.
            */}
            <ImagePlaceholder
              label="Map showing EverSmile Dental Care location"
              className="aspect-4/3 w-full"
              rounded="rounded-3xl"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass flex flex-col gap-5 rounded-3xl p-7 lg:col-span-3"
            noValidate
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-white">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  aria-required="true"
                  className="rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-white placeholder:text-muted/50 focus:border-primary"
                  placeholder="Jane Cooper"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-white">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-white placeholder:text-muted/50 focus:border-primary"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                className="rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-white placeholder:text-muted/50 focus:border-primary"
                placeholder="jane@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                aria-required="true"
                className="resize-none rounded-xl border border-border bg-white/3 px-4 py-3 text-sm text-white placeholder:text-muted/50 focus:border-primary"
                placeholder="Tell us what you'd like help with..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "submitting"}
              className="w-full sm:w-fit"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </Button>

            <p role="status" aria-live="polite" className="text-sm text-primary-light">
              {status === "success" &&
                "Thanks — your message has been sent. We'll be in touch shortly."}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
