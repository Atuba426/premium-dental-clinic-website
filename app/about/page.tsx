import type { Metadata } from "next";
import About from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about EverSmile Dental Care's patient-first philosophy, eighteen years of practice, and what makes our clinic different.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About />
    </div>
  );
}
