import {
    HiOutlineHeart,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineCpuChip,
  } from "react-icons/hi2";
  import Container from "@/components/common/Container";
  import SectionHeader from "@/components/common/SectionHeader";
  import Reveal from "@/components/common/Reveal";
  
  const SUPPORTING_REASONS = [
    {
      icon: HiOutlineClock,
      title: "Same-Week Availability",
      description: "Urgent care and routine visits, without a months-long wait.",
    },
    {
      icon: HiOutlineCurrencyDollar,
      title: "Transparent Pricing",
      description: "Costs explained upfront, before any treatment begins.",
    },
    {
      icon: HiOutlineCpuChip,
      title: "Modern Technology",
      description: "Digital imaging and precision tools for accurate diagnosis.",
    },
  ];
  
  export default function WhyChooseUs() {
    return (
      <section id="why-us" aria-labelledby="why-us-heading" className="py-24 md:py-32">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            eyebrow="Why Choose Us"
            title={<span id="why-us-heading">Care that respects your time and trust</span>}
            subtitle="Every detail of the EverSmile experience is designed around one goal: making excellent dental care feel effortless."
          />
  
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2">
            <Reveal className="md:row-span-2">
              <article className="glass flex h-full flex-col justify-between gap-8 rounded-3xl p-8 transition-all duration-300 hover:border-border-hover hover:bg-surface-hover md:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <HiOutlineHeart className="h-7 w-7 text-primary-light" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                    Patient comfort comes first
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-muted">
                    From sedation options to a genuinely calming clinic
                    environment, we&apos;ve rebuilt the dental visit around
                    reducing anxiety at every step — not just treating teeth.
                  </p>
                </div>
              </article>
            </Reveal>
  
            {SUPPORTING_REASONS.map((reason, index) => (
              <Reveal key={reason.title} delay={0.05 * (index + 1)}>
                <article className="glass flex h-full flex-col gap-4 rounded-3xl p-7 transition-all duration-300 hover:border-border-hover hover:bg-surface-hover">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <reason.icon className="h-5 w-5 text-primary-light" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-base font-semibold text-white">
                      {reason.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {reason.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }
  