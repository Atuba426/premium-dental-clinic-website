import type { Metadata } from "next";
import Gallery from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A closer look at the EverSmile Dental Care clinic, technology, and team.",
};

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <Gallery />
    </div>
  );
}
