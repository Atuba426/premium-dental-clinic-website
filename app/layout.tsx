import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "EverSmile Dental Care | Premium Dental Clinic",
  description:
    "Professional dental care with experienced dentists, modern treatments, and easy appointment booking.",
  keywords: [
    "Dental Clinic",
    "Dentist",
    "Teeth Whitening",
    "Dental Implants",
    "Root Canal",
    "Dental Care",
  ],
  authors: [{ name: "EverSmile Dental Care" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}


