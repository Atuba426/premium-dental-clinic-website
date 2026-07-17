import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import Reveal from "@/components/common/Reveal";
import Image from "next/image"; // Imported Next.js Image

// Unique src added to each piece of the gallery while keeping your explicit grid paths
const GALLERY_ITEMS = [
  { 
    label: "Clinic reception and waiting lounge", 
    ratio: "aspect-[4/3]", 
    span: "sm:col-span-2",
    src: "/waiting-area.jpg",
  },
  { 
    label: "Close-up of treatment chair and equipment", 
    ratio: "aspect-[3/4]", 
    span: "",
    src: "/closeup-treatment.jpg" 
  },
  { 
    label: "Dentist consulting with a patient", 
    ratio: "aspect-[3/4]", 
    span: "",
    src: "/doctor-consulting.jpg" 
  },
  { 
    label: "Modern sterilization and equipment room", 
    ratio: "aspect-[4/3]", 
    span: "",
    src: "/surgical-room.jpg" 
  },
  { 
    label: "Wide view of a private treatment suite", 
    ratio: "aspect-[4/3]", 
    span: "sm:col-span-2",
    src: "/wide-view.jpg" 
  },
  { 
    label: "Patient smiling after a whitening treatment", 
    ratio: "aspect-[3/4]", 
    span: "",
    src: "/happy-patient.jpg" 
  },
];

export default function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="Gallery"
          title={<span id="gallery-heading">Step inside EverSmile</span>}
          subtitle="A closer look at the space, the technology, and the people behind every visit."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {GALLERY_ITEMS.map((item, index) => (
            <Reveal key={item.label} delay={Math.min(index * 0.05, 0.2)} className={item.span}>
              {/* Added relative positioning to make the layout context precise */}
              <figure className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-surface ${item.ratio}`}>
                <Image 
                  src={item.src} 
                  alt={item.label} 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  priority={index < 2} // Preloads the first row of images
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}