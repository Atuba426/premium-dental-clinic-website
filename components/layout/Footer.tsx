import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn, FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import Container from "@/components/common/Container";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Dentists", href: "#dentists" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

const SERVICE_LINKS = [
  { label: "Cosmetic Dentistry", href: "#services" },
  { label: "Teeth Whitening", href: "#services" },
  { label: "Preventive Care", href: "#services" },
  { label: "Dental Implants", href: "#services" },
];

const SOCIALS = [
  { icon: FaLinkedinIn, label: "LinkedIn" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaFacebookF, label: "Facebook" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="border-t border-border">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="#" className="flex items-center gap-2.5" aria-label="EverSmile Dental Care home">
            <Image src="/logo.svg" alt="" width={30} height={30} className="h-7 w-7" />
            <span className="font-display text-lg font-semibold text-white">EverSmile</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Creating confident smiles every day, with premium dental care
            built around comfort, trust, and lasting results.
          </p>
          <div className="mt-1 flex items-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={`EverSmile Dental Care on ${social.label}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-muted transition-colors hover:bg-primary/10 hover:text-primary-light"
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Quick links" className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-muted transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="flex flex-col gap-3">
            {SERVICE_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-muted transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="flex flex-col gap-3 text-sm text-muted">
            <li>128 Maple Grove Avenue, Suite 4</li>
            <li>
              <a href="tel:+15551234567" className="transition-colors hover:text-white">
                +1 (555) 123-4567
              </a>
            </li>
            <li>
              <a href="mailto:hello@eversmiledental.example" className="transition-colors hover:text-white">
                hello@eversmiledental.example
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>© {year} EverSmile Dental Care. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
