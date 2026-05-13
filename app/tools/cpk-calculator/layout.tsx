import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Cpk Calculator for Food Manufacturing QA Teams | Provarx",
  description:
    "Free Cpk process capability calculator for food manufacturing QA teams. Enter USL, LSL, mean, and sigma — get Cpk, sigma level, and DPMO instantly.",
  canonical: "https://getprovarx.com/tools/cpk-calculator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
