import type { Metadata } from "next";
import "./globals.css";

// Absolute URL to your premium brand hallmark for rich social link unfurling
const OG_IMAGE_URL = "https://firebasestorage.googleapis.com/v0/b/growshare-capital.firebasestorage.app/o/Logo%2FSBD.png?alt=media&token=07ed4301-023d-42fa-9f69-2f3b789c8406";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skylinedb3.com"),
  title: {
    default: "Skyline Architects — Where Vision Meets Structure",
    template: "%s | Skyline Architects",
  },
  description:
    "Skyline Architects is an award-winning architecture firm crafting landmark residential, commercial, and cultural spaces across the globe. A GrowShare Capital entity.",
  keywords: [
    "Skyline Architects",
    "architecture firm",
    "masterplanning",
    "luxury design build",
    "structural engineering",
    "residential architecture",
    "commercial real estate development",
    "Memphis architects",
    "GrowShare Capital"
  ],
  authors: [{ name: "Skyline Architects" }],
  creator: "Skyline Architects",
  publisher: "GrowShare Capital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Skyline Architects — Where Vision Meets Structure",
    description: "Award-winning global architecture and integrated masterplanning. A GrowShare Capital entity.",
    url: "https://www.skylinedb3.com",
    siteName: "Skyline Architects",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Skyline Architects — Premium Global Architecture & Masterplanning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyline Architects — Where Vision Meets Structure",
    description: "Award-winning global architecture and integrated masterplanning. A GrowShare Capital entity.",
    images: [OG_IMAGE_URL],
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
        <main>{children}</main>
      </body>
    </html>
  );
}