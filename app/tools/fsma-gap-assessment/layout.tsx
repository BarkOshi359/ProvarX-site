import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free FSMA 204 Gap Assessment — Score Your Facility's Readiness | Provarx",
  description:
    "Free FSMA 204 compliance gap assessment. Answer 10 questions and get your facility readiness score in 5 minutes. No signup required.",
  canonical: "https://getprovarx.com/tools/fsma-gap-assessment",
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Score Your FSMA 204 Readiness in 5 Minutes",
  description:
    "Use this free gap assessment to score your food facility's FSMA 204 compliance readiness across 10 critical dimensions — traceability records, CTE documentation, KDE capture, and 24-hour FDA response capability.",
  totalTime: "PT5M",
  step: [
    {
      "@type": "HowToStep",
      name: "Answer 10 readiness questions",
      text: "Respond Yes, Partially, or No to 10 questions covering your traceability plan, KDE capture, CCP monitoring, recall procedures, and supplier compliance.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Enter your facility email",
      text: "Provide your work email to receive your full readiness score and a detailed breakdown by compliance dimension.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Review your score and gap report",
      text: "See your facility's readiness score out of 100, understand which gaps pose the highest enforcement risk, and get a prioritized action list.",
      position: 3,
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {children}
    </>
  );
}
