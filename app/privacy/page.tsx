import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: "Privacy Policy | Provarx",
    description:
      "How Provarx LLC collects, uses, and protects personal information across getprovarx.com, our free FSMA 204 tools, and our advertising, including LinkedIn lead generation forms.",
    canonical: "https://getprovarx.com/privacy",
  }),
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "July 14, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-[#0A2540] mb-4">{title}</h2>
      <div className="flex flex-col gap-4 text-[#374151] text-[15px] leading-7">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0A2540] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#00C9A7] text-xs uppercase tracking-widest font-semibold mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/60 text-sm">
            Effective {EFFECTIVE_DATE}. Last updated {EFFECTIVE_DATE}.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          <p className="text-[#374151] text-[15px] leading-7">
            This Privacy Policy explains what personal information Provarx LLC collects when you
            visit our website, use our free tools, or contact us, and how we use, share, and protect
            that information. Please read it carefully. If you have any questions, you can reach us at{" "}
            <a href="mailto:clinton@getprovarx.com" className="text-[#00C9A7] font-semibold hover:underline">
              clinton@getprovarx.com
            </a>
            .
          </p>

          <Section title="Who we are">
            <p>
              Provarx LLC is a limited liability company formed in the State of New Jersey, operating
              the website at getprovarx.com. In this policy, the terms Provarx, we, us, and our refer
              to Provarx LLC. You can contact us at any time at{" "}
              <a href="mailto:clinton@getprovarx.com" className="text-[#00C9A7] font-semibold hover:underline">
                clinton@getprovarx.com
              </a>
              .
            </p>
          </Section>

          <Section title="Information we collect">
            <p>We collect information in two ways.</p>
            <p className="font-semibold text-[#0A2540]">
              (a) Information you give us directly
            </p>
            <p>
              When you fill out a form, request a resource, or use one of our tools, you may provide
              personal information such as your name, work email address, company name, and job
              title. This also includes any information you submit through our free tools (the FSMA
              204 Gap Assessment, the Recall Trace Simulator, the Cpk Calculator, and the FSMA
              Deadline Tracker), through our contact forms, or through lead generation forms that we
              host on third-party platforms such as LinkedIn.
            </p>
            <p className="font-semibold text-[#0A2540]">
              (b) Information we collect automatically
            </p>
            <p>
              When you browse the site, we and our analytics providers automatically collect certain
              technical information, including your IP address, browser and device type, the pages
              you visit, the referring URL, and similar analytics data. This information is collected
              through cookies and tracking technologies, including the LinkedIn Insight Tag.
            </p>
          </Section>

          <Section title="How we use information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>respond to your inquiries and requests;</li>
              <li>deliver the resources and tool results you ask for;</li>
              <li>send you relevant product and industry communications where permitted by law;</li>
              <li>operate, maintain, and improve our website and product;</li>
              <li>measure the performance of our advertising; and</li>
              <li>comply with our legal obligations.</li>
            </ul>
          </Section>

          <Section title="Legal bases for processing">
            <p>
              Where required by law, we rely on the following legal bases to process your personal
              information: your consent, for example when you opt in to marketing communications; our
              legitimate interest in promoting our business-to-business products and services to
              relevant professional audiences; and the performance of a contract, for example when we
              provide a service you have requested.
            </p>
          </Section>

          <Section title="Lead generation forms and third parties">
            <p>
              We run advertising campaigns that use lead generation forms hosted on third-party
              platforms, including LinkedIn. When you submit a LinkedIn Lead Gen Form, LinkedIn shares
              the contact information you provided in that form with Provarx so that we can follow up
              with you. The handling of your data by LinkedIn is governed by the LinkedIn privacy
              policy, available at{" "}
              <a
                href="https://www.linkedin.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00C9A7] font-semibold hover:underline break-words"
              >
                https://www.linkedin.com/legal/privacy-policy
              </a>
              . We encourage you to review it to understand how LinkedIn processes your information.
            </p>
          </Section>

          <Section title="Service providers we share data with">
            <p>
              We share personal information with a limited set of service providers who help us
              operate our business, and only as needed for those providers to perform their services
              for us. Our providers include:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Hosting and infrastructure: Vercel</li>
              <li>Database: Supabase</li>
              <li>Email and productivity: Google Workspace</li>
              <li>Email outreach: Instantly.ai</li>
              <li>Advertising: LinkedIn</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </Section>

          <Section title="Cookies and tracking technologies">
            <p>
              Cookies are small text files that a website places on your device to store information.
              We use cookies and similar tracking technologies to understand how visitors use our
              site and to measure and improve our advertising. In particular, we use the LinkedIn
              Insight Tag to measure the performance of our LinkedIn advertising and to show relevant
              ads to people who have visited our site, a practice known as retargeting.
            </p>
            <p>
              You can control cookies through your browser settings, and you can manage how LinkedIn
              uses your data for advertising through the ad settings in your LinkedIn account.
              Disabling cookies may affect how parts of the site function.
            </p>
          </Section>

          <Section title="Data retention">
            <p>
              We retain personal information for as long as it is needed to fulfill the purposes
              described in this policy, including to provide the services you request, to maintain our
              business records, and to meet our legal obligations. When information is no longer
              needed, we delete it or anonymize it.
            </p>
          </Section>

          <Section title="Security">
            <p>
              We use reasonable technical and organizational measures designed to protect personal
              information against unauthorized access, loss, misuse, or alteration. No method of
              transmission over the internet and no method of electronic storage is completely
              secure, so while we work to protect your information, we cannot guarantee absolute
              security.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Depending on where you live, you may have the right to access the personal information
              we hold about you, to request that we correct it, to request that we delete it, and to
              opt out of marketing communications. You can exercise any of these rights, or ask a
              question about your information, by emailing us at{" "}
              <a href="mailto:clinton@getprovarx.com" className="text-[#00C9A7] font-semibold hover:underline">
                clinton@getprovarx.com
              </a>
              . You can also unsubscribe from marketing emails at any time using the link in those
              emails.
            </p>
            <p>
              Residents of certain jurisdictions, including California and the European Union and the
              United Kingdom, may have additional rights under applicable law. We will honor those
              rights as required.
            </p>
          </Section>

          <Section title="Children">
            <p>
              Our site and services are intended for business professionals and are not directed to
              children. We do not knowingly collect personal information from anyone under the age of
              16. If you believe a child has provided us with personal information, please contact us
              and we will delete it.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices
              or for legal reasons. When we make changes, we will revise the last updated date shown
              at the top of this page. We encourage you to review this policy periodically.
            </p>
          </Section>

          <Section title="Contact us">
            <p>
              If you have any questions about this Privacy Policy or how we handle your information,
              please contact us at{" "}
              <a href="mailto:clinton@getprovarx.com" className="text-[#00C9A7] font-semibold hover:underline">
                clinton@getprovarx.com
              </a>
              .
            </p>
            <p>Provarx LLC, New Jersey, United States.</p>
          </Section>
        </div>
      </section>
    </>
  );
}
