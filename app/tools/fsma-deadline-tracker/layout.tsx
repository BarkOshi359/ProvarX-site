import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FSMA 204 Compliance Deadline Tracker — Is Your Facility on Time? | Provarx",
  description:
    "Track your FSMA 204 compliance deadline by facility size. Live countdown timer and 12-point implementation checklist — free, no signup.",
  canonical: "https://getprovarx.com/tools/fsma-deadline-tracker",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
