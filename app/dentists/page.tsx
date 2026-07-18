import type { Metadata } from "next";
import Doctors from "@/components/sections/Doctors";

export const metadata: Metadata = {
  title: "Meet Our Dentists",
  description:
    "Meet the board-certified dentists at EverSmile Dental Care — cosmetic, restorative, implant, and family dentistry specialists.",
};

export default function DentistsPage() {
  return (
    <div className="pt-20">
      <Doctors />
    </div>
  );
}
