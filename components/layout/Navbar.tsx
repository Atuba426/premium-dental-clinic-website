"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Dentists", href: "#dentists" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "border-b border-border bg-background/70 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="#" className="flex items-center gap-2.5" aria-label="EverSmile Dental Care home">
          <Image
            src="/logo.svg"
            alt=""
            width={84}
            height={84}
            priority
            className="h-8 w-8"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            EverSmile
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact" variant="primary" size="md">
            Book Appointment
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
        >
          {isMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-muted transition-colors hover:bg-surface hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="#contact" variant="primary" size="lg" className="mt-3 w-full">
                Book Appointment
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
