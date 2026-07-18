import Container from "@/components/common/Container";
import NewsletterForm from "@/components/common/NewsletterForm";

export default function Newsletter() {
  return (
    <section aria-labelledby="newsletter-heading" className="py-20">
      <Container>
        <div className="glass mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl px-8 py-12 text-center shadow-card sm:px-12">
          <h2 id="newsletter-heading" className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Dental tips, straight to your inbox
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Occasional updates on oral care, seasonal offers, and clinic
            news — no spam, unsubscribe anytime.
          </p>
          <div className="w-full max-w-sm">
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
