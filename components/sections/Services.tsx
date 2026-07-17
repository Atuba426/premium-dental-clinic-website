import {
    HiOutlineSparkles,
    HiOutlineFaceSmile,
    HiOutlineShieldCheck,
    HiOutlineWrenchScrewdriver,
    HiOutlineUserGroup,
    HiOutlineBeaker,
  } from "react-icons/hi2";
  import Container from "@/components/common/Container";
  import SectionHeader from "@/components/common/SectionHeader";
  import Reveal from "@/components/common/Reveal";
  
  const SERVICES = [
    {
      icon: HiOutlineFaceSmile,
      title: "Cosmetic Dentistry",
      description:
        "Veneers, bonding, and smile design tailored to your natural facial proportions.",
    },
    {
      icon: HiOutlineSparkles,
      title: "Teeth Whitening",
      description:
        "In-office and take-home whitening systems for noticeably brighter results.",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Preventive Care",
      description:
        "Routine checkups and cleanings focused on catching issues before they start.",
    },
    {
      icon: HiOutlineWrenchScrewdriver,
      title: "Restorative Dentistry",
      description:
        "Crowns, bridges, and fillings that restore both function and appearance.",
    },
    {
      icon: HiOutlineUserGroup,
      title: "Family Dentistry",
      description:
        "Comprehensive care for every age, from a child's first visit to senior care.",
    },
    {
      icon: HiOutlineBeaker,
      title: "Dental Implants",
      description:
        "Permanent, natural-looking tooth replacement backed by advanced imaging.",
    },
  ];
  
  function ServiceCard({ icon: Icon, title, description }: (typeof SERVICES)[number]) {
    return (
      <article className="group glass flex flex-col gap-5 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-border-hover hover:bg-surface-hover">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
          <Icon className="h-6 w-6 text-primary-light" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-muted">{description}</p>
        </div>
      </article>
    );
  }
  
  export default function Services() {
    return (
      <section id="services" aria-labelledby="services-heading" className="py-24 md:py-32">
        <Container className="flex flex-col gap-14">
          <SectionHeader
            eyebrow="Our Services"
            title={
              <span id="services-heading">Comprehensive care, all in one place</span>
            }
            subtitle="From routine cleanings to advanced cosmetic work, every treatment is delivered with the same attention to comfort and detail."
          />
  
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Reveal key={service.title} delay={Math.min(index * 0.05, 0.2)}>
                <ServiceCard {...service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }
  