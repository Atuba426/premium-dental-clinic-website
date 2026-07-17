import { HiStar } from "react-icons/hi2";
import { FaQuoteRight } from "react-icons/fa";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import Reveal from "@/components/common/Reveal";
import Image from "next/image"; // Imported Next.js Image

const TESTIMONIALS = [
  {
    name: "Jordan Michaels",  
    role: "Patient since 2021",
    rating: 5,
    quote:
      "The calmest dental visit I've ever had. They explained every step before doing it, and the results on my whitening treatment exceeded what I expected.",
    image: "/client1.webp",
  },
  {
    name: "Sara Whitmore",
    role: "Patient since 2019",
    rating: 5,
    quote:
      "I used to dread the dentist. EverSmile changed that completely — the team is patient, the office feels more like a spa, and scheduling is genuinely easy.",
    image: "/client2.webp",
  },
  {
    name: "Daniel Ortiz",
    role: "Patient since 2023",
    rating: 5,
    quote:
      "Got my implant done here after a bad experience elsewhere. Precise, well explained, and follow-up care was better than any clinic I've been to.",
    image: "/client3.webp",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of 5`}
      className="flex items-center gap-1"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar
          key={i}
          aria-hidden="true"
          className={`h-4 w-4 ${i < rating ? "text-primary-light" : "text-white/10"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-24 md:py-32"
    >
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="Testimonials"
          title={<span id="testimonials-heading">Trusted by patients across the city</span>}
          subtitle="Real experiences from people who came in anxious and left with a reason to smile."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={Math.min(index * 0.08, 0.2)}>
              <article className="glass relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:border-border-hover hover:bg-surface-hover">
                <FaQuoteRight
                  aria-hidden="true"
                  className="absolute -right-2 -top-2 h-20 w-20 text-primary/5"
                />
                <StarRating rating={testimonial.rating} />
                <p className="relative text-sm leading-relaxed text-muted sm:text-base">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-border pt-5">
                  
                  {/* Circular Avatar Container */}
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border/50">
                    <Image
                      src={testimonial.image}
                      alt={`Photo of ${testimonial.name}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-muted">{testimonial.role}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}