import type { Metadata } from "next";
import Testimonials from "@/components/sections/Testimonals";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Real patient experiences from EverSmile Dental Care.",
};

export default function TestimonialsPage() {
  return (
    <div className="pt-20">
      <Testimonials />
    </div>
  );
}
