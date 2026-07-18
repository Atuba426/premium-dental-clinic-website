import type { Metadata } from "next";
import Booking from "@/components/sections/Booking";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Book your appointment at EverSmile Dental Care in under a minute — choose a service and a preferred time window.",
};

export default function BookingPage() {
  return (
    <div className="pt-20">
      <Booking />
    </div>
  );
}
