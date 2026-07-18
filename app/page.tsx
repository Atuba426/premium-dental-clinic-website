import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Booking from "@/components/sections/Booking";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Doctors from "@/components/sections/Doctors";
import Testimonials from "@/components/sections/Testimonals";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/layout/Footer";

// LocalBusiness/Dentist structured data helps search engines surface rich
// results (address, hours, rating) for local "dentist near me" queries —
// this is one of the highest-leverage SEO additions for a clinic site,
// more impactful than most on-page copy changes.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "EverSmile Dental Care",
  description:
    "Premium, patient-first dental care including cosmetic dentistry, teeth whitening, preventive care, and dental implants.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "128 Maple Grove Avenue, Suite 4",
  },
  telephone: "+1-555-123-4567",
  email: "hello@eversmiledental.example",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "15:00",
    },
  ],
};

export default function Home() {
  return (
    <>
     
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Booking/>
        <WhyChooseUs />
        <Doctors />
        <Testimonials />
        <Gallery />
        <FAQ />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
