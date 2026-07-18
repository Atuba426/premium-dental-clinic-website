import {
  HiOutlineShieldCheck,
  HiOutlineStar,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";
import Reveal from "@/components/common/Reveal";
import Image from "next/image";

const STATS = [
  { value: "18+", label: "Years in practice" },
  { value: "24k+", label: "Smiles treated" },
  { value: "4.9/5", label: "Patient rating" },
];

const TRUST_BADGES = [
  { icon: HiOutlineShieldCheck, label: "Licensed & Insured" },
  { icon: HiOutlineStar, label: "Top-Rated Clinic" },
  { icon: HiOutlineCalendarDays, label: "Same-Week Appointments" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-40 md:pb-32 md:pt-48">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start gap-8">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary-light">
              Premium Dental Care
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Creating Confident Smiles Every Day
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-lg text-balance text-lg leading-relaxed text-muted">
              EverSmile Dental Care blends advanced dentistry with a calm,
              modern experience — so every visit feels less like a procedure and
              more like an upgrade to your everyday confidence.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="#contact" variant="primary" size="lg">
                Book Appointment
              </Button>
              <Button
                className="text-black"
                href="#services"
                variant="secondary"
                size="lg"
              >
                Explore Services
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="w-full">
            <dl className="grid w-full max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-white sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dd className="text-xs text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal direction="none" delay={0.1} className="relative">
          {/* Decorative glow sits behind the placeholder to preview how a
              real photo with a transparent/soft edge would feel here. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-[100px]"
          />
          <ImagePlaceholder
            label="Portrait of lead dentist with a patient in treatment room"
            ratioHint="1200 × 1400"
            className="aspect-6/7 w-full shadow-card"
            rounded="rounded-3xl"
          />
          <Image
            src="/Dr Shah with Patient.webp"
            alt="Dr. Amara Reyes"
            fill
            loading="eager"
           sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />

          <div className="glass absolute -bottom-6 -left-6 hidden flex-col gap-1 rounded-2xl px-5 py-4 shadow-card sm:flex">
            <div className="flex items-center gap-2">
              {TRUST_BADGES.slice(0, 1).map((badge) => (
                <badge.icon
                  key={badge.label}
                  className="h-5 w-5 text-primary-light"
                  aria-hidden="true"
                />
              ))}
              <span className="text-sm font-medium text-black dark:text-white">
                Licensed & Insured
              </span>
            </div>
          </div>
        </Reveal>
      </Container>

      <Reveal delay={0.25}>
        <Container className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-border pt-8">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-sm text-muted"
            >
              <badge.icon
                className="h-5 w-5 text-primary-light"
                aria-hidden="true"
              />
              <span>{badge.label}</span>
            </div>
          ))}
        </Container>
      </Reveal>
    </section>
  );
}
