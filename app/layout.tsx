import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getprovarx.com"),
  title: "Provarx — Food Safety Compliance & Process Intelligence",
  description:
    "Provarx gives food and beverage manufacturers tamper-proof compliance records and real-time process intelligence — so an FDA audit is never a surprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Nav />
        <main className="pt-16">{children}</main>
        <Footer />
        <Analytics />
        {/* Instantly.ai (Leadsy) visitor tracking tag */}
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          strategy="afterInteractive"
          data-pid="1tquFa1wC8YHwkcH9"
          data-version="062024"
        />
      </body>
    </html>
  );
}
