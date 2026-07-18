import type { Metadata } from "next";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about insurance, appointments, and treatments at EverSmile Dental Care.",
};

export default function FAQPage() {
  return (
    <div className="pt-20">
      <FAQ />
    </div>
  );
}
