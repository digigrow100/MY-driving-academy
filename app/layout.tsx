import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import HeaderSpacer from "@/components/HeaderSpacer";
import FloatingContact from "@/components/FloatingContact";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteDescription =
  "Premium driving tuition in Leicester. DVSA-qualified instructors, dual-control cars, and flexible lessons, intensive courses, block bookings, test prep, motorway lessons and refresher classes.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mydrivingacademy.example.com",
  ),
  title: {
    template: "%s | MY Driving Academy",
    default: "MY Driving Academy | Learn to Drive with Confidence",
  },
  description: siteDescription,
  icons: {
    icon: "/site-icon.png",
    apple: "/site-icon.png",
  },
  openGraph: {
    title: "MY Driving Academy | Learn to Drive with Confidence",
    description: siteDescription,
    images: [
      {
        url: "/og-banner.webp",
        width: 1200,
        height: 630,
        alt: "MY Driving Academy - Learn to Drive with Confidence",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MY Driving Academy | Learn to Drive with Confidence",
    description: siteDescription,
    images: ["/og-banner.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-on-background bg-background">
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-grow">
            <HeaderSpacer />
            {children}
          </main>
          <Footer />
          <FloatingContact />
        </MotionConfig>
      </body>
    </html>
  );
}
