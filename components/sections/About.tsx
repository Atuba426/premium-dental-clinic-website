import { HiOutlineCheckCircle } from "react-icons/hi2";
import Image from "next/image";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";

const DIFFERENTIATORS = [
  "Modern diagnostic technology paired with a gentle, patient-first approach",
  "Transparent pricing with no surprise fees at checkout",
  "A calm, spa-like environment designed to ease dental anxiety",
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 md:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <Reveal className="order-2 lg:order-1">
          <div className="flex flex-col items-start gap-6 text-left">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-light">
              About Us
            </span>
            <h2
              id="about-heading"
              className="text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              Dentistry built around how patients actually feel
            </h2>
            <p className="text-balance text-base leading-relaxed text-muted sm:text-lg">
              For over eighteen years, EverSmile Dental Care has treated
              every appointment as more than a checkup — it&apos;s a chance
              to remove the anxiety that keeps people from smiling freely.
              Our team combines clinical precision with genuine warmth, in a
              space designed to feel nothing like a typical dental office.
            </p>

            <ul className="flex flex-col gap-4">
              {DIFFERENTIATORS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <HiOutlineCheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-light"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-muted sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal direction="none" delay={0.1} className="order-1 lg:order-2">
          
          <div className="relative aspect-6/7 w-full overflow-hidden rounded-3xl shadow-card">
            <Image
              src="/clinic-doctor.jpg"
              alt="Dr. Amara Reyes with a patient in the treatment room"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}