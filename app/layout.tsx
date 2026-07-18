import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { ThemeProvider } from "@/components/common/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const siteUrl = "https://eversmiledental.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EverSmile Dental Care | Creating Confident Smiles Every Day",
    template: "%s | EverSmile Dental Care",
  },
  description:
    "EverSmile Dental Care delivers premium, patient-first dentistry — from routine checkups to advanced cosmetic and restorative care in a modern, comfortable clinic.",
  keywords: [
    "dental clinic",
    "cosmetic dentistry",
    "dentist near me",
    "teeth whitening",
    "dental implants",
    "EverSmile Dental Care",
  ],
  authors: [{ name: "EverSmile Dental Care" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "EverSmile Dental Care | Creating Confident Smiles Every Day",
    description:
      "Premium, patient-first dentistry in a modern clinic built around comfort, trust, and lasting smiles.",
    siteName: "EverSmile Dental Care",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EverSmile Dental Care clinic interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EverSmile Dental Care | Creating Confident Smiles Every Day",
    description:
      "Premium, patient-first dentistry in a modern clinic built around comfort, trust, and lasting smiles.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('eversmile-theme');
                  var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <WhatsAppButton/>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
