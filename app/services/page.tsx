import type { Metadata } from "next";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Cosmetic dentistry, teeth whitening, preventive care, restorative dentistry, family dentistry, and dental implants at EverSmile Dental Care.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <Services />
    </div>
  );
}
