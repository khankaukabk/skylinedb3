import type { Metadata } from "next";
import "./globals.css";

// IMPORTANT: Import your Navbar component here!
// (Adjust the path if your Navbar is in a different folder, like "@/components/Navbar")
import Navbar from "@/components/Navbar";

// Your Firebase Logo URL
const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/skylinedb3-e8295.firebasestorage.app/o/Logo%2FSBD.png?alt=media&token=f5776d7f-6da0-447b-a4ee-36d13c24dc73";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skylinedb3.com"),
  title: {
    default: "SkylineDB3 — Where Vision Meets Structure",
    template: "%s | SkylineDB3",
  },
  description:
    "SkylineDB3 is an award-winning architecture firm crafting landmark residential, commercial, and cultural spaces across the globe. A GrowShare Capital entity.",
  keywords: [
    "SkylineDB3",
    "architecture firm",
    "masterplanning",
    "luxury design build",
    "structural engineering",
    "residential architecture",
    "commercial real estate development",
    "Memphis architects",
    "GrowShare Capital"
  ],
  authors: [{ name: "SkylineDB3" }],
  creator: "SkylineDB3",
  publisher: "GrowShare Capital",
  icons: {
    icon: LOGO_URL, // This adds your logo to the browser tab!
    apple: LOGO_URL,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SkylineDB3 — Where Vision Meets Structure",
    description: "Award-winning global architecture and integrated masterplanning. A GrowShare Capital entity.",
    url: "https://www.skylinedb3.com",
    siteName: "SkylineDB3",
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 630,
        alt: "SkylineDB3 — Premium Global Architecture & Masterplanning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkylineDB3 — Where Vision Meets Structure",
    description: "Award-winning global architecture and integrated masterplanning. A GrowShare Capital entity.",
    images: [LOGO_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F9F9F7] m-0 p-0">
        {/* THIS MAKES YOUR NAVBAR GLOBAL! */}
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}