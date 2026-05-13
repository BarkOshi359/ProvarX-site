import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free FSMA 204 Recall Trace Simulator — See What FDA Expects in 24 Hours | Provarx",
  description:
    "Run a free FSMA 204 recall trace simulation. See exactly what FDA expects within 24 hours of a records request — before an outbreak forces you to find out.",
  canonical: "https://getprovarx.com/tools/recall-trace-simulator",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
