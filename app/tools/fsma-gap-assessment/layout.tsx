import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free FSMA 204 Gap Assessment — Score Your Facility's Readiness | Provarx",
  description:
    "Free FSMA 204 compliance gap assessment. Answer 10 questions and get your facility readiness score in 5 minutes. No signup required.",
  canonical: "https://getprovarx.com/tools/fsma-gap-assessment",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
