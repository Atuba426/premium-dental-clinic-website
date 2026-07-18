"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/common/Button";

type Status = "idle" | "submitting" | "success" | "error";

interface NewsletterFormProps {
  /** Adjusts spacing/typography for the compact Footer placement vs the larger standalone section. */
  variant?: "default" | "compact";
}

export default function NewsletterForm({ variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  const inputId = variant === "compact" ? "newsletter-email-compact" : "newsletter-email";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className={`flex ${variant === "compact" ? "flex-col gap-2 sm:flex-row" : "flex-col gap-3 sm:flex-row"}`}>
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          required
          aria-required="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-full border border-border bg-white/3 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-primary"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={status === "submitting"}
          className="shrink-0"
        >
          {status === "submitting" ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>

      <p role="status" aria-live="polite" className="text-xs">
        {status === "success" && (
          <span className="text-primary-light">You&apos;re subscribed — welcome aboard.</span>
        )}
        {status === "error" && <span className="text-red-400">{errorMessage}</span>}
      </p>
    </form>
  );
}
