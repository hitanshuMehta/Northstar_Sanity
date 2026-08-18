import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Northstar — Digital Products / Strategy / Experience",
  description: "Northstar partners with ambitious companies to design, build and scale digital products that move businesses forward.",
  keywords: ["digital agency", "product design", "Next.js development", "editorial web design", "Sanity CMS architecture"],
  authors: [{ name: "Northstar Agency" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Northstar — Digital Products / Strategy / Experience",
    description: "Northstar partners with ambitious companies to design, build and scale digital products that move businesses forward.",
    url: "https://northstar.agency",
    siteName: "Northstar Agency",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans antialiased bg-north-bg text-north-primary selection:bg-[#C7FF3D] selection:text-black">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
