import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FSMA 204 & Food Safety Compliance Blog | Provarx",
  description:
    "FSMA 204 compliance guidance, food safety regulation breakdowns, and process intelligence insights — written by a Six Sigma Black Belt who has worked in your facilities.",
  canonical: "https://getprovarx.com/blog",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
