import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import Reveal from "@/components/common/Reveal";
import Image from "next/image";

const DOCTORS = [
  {
    name: "Dr. Amara Reyes",
    title: "Lead Cosmetic Dentist",
    qualification: "DDS, University of Michigan",
    experience: "15+ years experience",
    image: "/best-doctor-mumbai1.webp", 
  },
  {
    name: "Dr. Elias Whitfield",
    title: "Restorative & Implant Specialist",
    qualification: "DMD, Boston University",
    experience: "12+ years experience",
    image: "/best-doctor-mumbai2.webp",   
  },
  {
    name: "Dr. Priya Nandan",
    title: "Family & Preventive Care",
    qualification: "DDS, UCLA School of Dentistry",
    experience: "9+ years experience",
    image: "/best-doctor3.webp", 
  },
];

const SOCIALS = [
  { icon: FaLinkedinIn, label: "LinkedIn" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaInstagram, label: "Instagram" },
];

export default function Doctors() {
  return (
    <section id="dentists" aria-labelledby="dentists-heading" className="py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="Meet Our Dentists"
          title={<span id="dentists-heading">A team you can trust with your smile</span>}
          subtitle="Board-certified specialists who bring both technical precision and genuine warmth to every appointment."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOCTORS.map((doctor, index) => (
            <Reveal key={doctor.name} delay={Math.min(index * 0.08, 0.2)}>
              <article className="glass flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-border-hover">
                
                {/* 1. Relative Container wraps the fill image so it stays in its box */}
                <div className="relative aspect-4/5 w-full overflow-hidden">
                  <Image 
                    src={doctor.image} 
                    alt={`Portrait of ${doctor.name}`} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>

                {/* 2. Text layout is now fully visible underneath the image */}
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {doctor.name}
                    </h3>
                    <p className="text-sm font-medium text-primary-light">{doctor.title}</p>
                  </div>
                  <p className="text-sm text-muted">{doctor.qualification}</p>
                  <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light">
                    {doctor.experience}
                  </span>

                  <div className="mt-2 flex items-center gap-3 border-t border-border pt-4">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.label}
                        href="#"
                        aria-label={`${doctor.name} on ${social.label}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-primary/10 hover:text-primary-light"
                      >
                        <social.icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ))}
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