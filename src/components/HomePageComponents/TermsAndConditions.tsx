import { Roboto } from "next/font/google";
import React from "react";

type propTypes = {
  theme: string;
};

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export default function TermsAndConditions({ theme }: propTypes) {
  return (
    <section id="TermsAndConditions"
      className={`scroll-mt-24  flex flex-col gap-y-4 text-[8px] p-3 sm:p-4 md:py-10 md:px-24 ${
        roboto.variable
      } ${
        theme === "dark"
          ? "bg-[#262626] text-[#757575]"
          : "bg-[var(--secondary-bg-color)] text-[#CFCFCF]"
      }`}
    >
      <p>
        <strong>Welcome to Macnman Technologies Pvt Ltd!</strong> These Terms and Conditions
        (&quot;Terms&quot;) govern your access to and use of the Macnman&apos;s
        website (the &quot;Website&quot;). As an Original Equipment Manufacturer
        (OEM) of IoT products and solutions, this Website is designed primarily
        to provide information to potential business partners, integrators, and
        clients. By accessing or using our Website, you acknowledge that you
        have read, understood, and agree to be bound by these Terms. If you do
        not agree to these Terms, please do not use our Website.
      </p>

      <p>
        <strong>1. Acceptance of Terms:</strong><br />
        By using our Website, you confirm that you are authorized to enter into
        a binding contract on behalf of your business or entity (if applicable)
        and that you accept these Terms. These Terms constitute a legally
        binding agreement between you and Macnman IoT regarding your use of the
        Website.
      </p>

      <p>
        <strong>2. Website Content &amp; Intellectual Property:</strong><br />
        <strong>Ownership:</strong> All content on this Website, including but
        not limited to text, graphics, logos, images, audio clips, video clips,
        data compilations, software, product descriptions, and technical
        information (collectively, &quot;Content&quot;), is the property of
        Macnman IoT or its licensors and is protected by Indian and
        international copyright, trademark, and other intellectual property
        laws.
      </p>

      <p>
        <strong>Informational &amp; Marketing Purpose:</strong> All Content,
        including images, videos, illustrations, graphical representations, and
        textual descriptions of products and solutions, is provided for general
        informational, illustrative, and marketing purposes only. While we
        strive to present accurate and up-to-date information, this Content is
        intended to convey the general features, capabilities, and potential
        applications of our IoT products.
      </p>

      <p>
        <strong>No Warranty from Website Content:</strong> The Content on this
        Website does not constitute a definitive specification, technical
        guarantee, or warranty for any specific product or solution. Actual
        product specifications, performance, features, and appearance are
        subject to change and are exclusively defined in official product
        datasheets, technical documentation, and specific commercial agreements
        (e.g., purchase orders, supply contracts) between Macnman IoT and its
        clients. You acknowledge that relying solely on Website Content for
        product suitability or performance is at your own risk.
      </p>

      <p>
        <strong>Limited License:</strong> You are granted a limited,
        non-exclusive, non-transferable, revocable license to access and use the
        Website and its Content for your internal business informational
        purposes, such as evaluating potential OEM partnerships or product
        integration. You may not reproduce, distribute, modify, create
        derivative works of, publicly display, publicly perform, republish,
        download, store, or transmit any of the Content without the prior
        written consent of Macnman IoT.
      </p>

      <p>
        <strong>3. Use of Website:</strong><br />
        You agree to use the Website only for lawful purposes consistent with
        its intended B2B/OEM informational nature and in a manner that does not
        infringe the rights of, or restrict or inhibit the use and enjoyment of
        this Website by any third party. Prohibited conduct includes, but is not
        limited to: Engaging in any activity that could harm, disable,
        overburden, or impair the Website or the servers and networks connected
        to the Website. Attempting to gain unauthorized access to any portion of
        the Website, other accounts, computer systems, or networks connected to
        the Website through hacking, password mining, or any other means. Using
        the Website to distribute any malicious software, viruses, or other
        harmful content. Collecting or storing personal data about other users
        or any commercial information without their express consent. Using the
        Website for direct sales or marketing of third-party products or
        services without explicit authorization.
      </p>

      <p>
        <strong>4. Disclaimers:</strong><br />
        <strong>&quot;As Is&quot; and &quot;As Available&quot; Basis:</strong>{" "}
        The Website and all Content are provided on an &quot;as is&quot; and
        &quot;as available&quot; basis, without any warranties of any kind,
        either express or implied.
        <br />
        <strong>No Warranties of Performance or Suitability:</strong> Macnman IoT does not warrant that the Website or its Content will be error-free, uninterrupted, secure, or available at any particular time or location.
        <br />
        <strong>Product Development:</strong> Products and solutions mentioned
        on the Website may be under development or subject to change. At Macnman
        Technologies Pvt. Ltd. (&quot;Macnman&quot;), we take pride in our field
        success and may highlight it via case studies, client stories, and
        marketing materials. Unless otherwise agreed in writing, we consider
        ourselves to have full rights to share such information.
      </p>

      <p>
        <strong>5. Limitation of Liability:</strong><br />
        To the fullest extent permitted by applicable law, in no event shall
        Macnman IoT, its affiliates, directors, officers, employees, agents, or
        suppliers be liable for any direct, indirect, incidental, special,
        consequential, punitive, or exemplary damages, including but not limited
        to, loss of profits, goodwill, data, or other intangible losses arising
        out of or in connection with your use of the Website or its Content.
      </p>

      <p>
        <strong>6. Indemnification:</strong><br />
        You agree to defend, indemnify, and hold harmless Macnman IoT and all
        related entities from any claims, liabilities, damages, losses, or
        expenses arising from your violation of these Terms or your misuse of
        the Website.
      </p>

      <p>
        <strong>7. Links to Third-Party Websites:</strong><br />
        The Website may contain links to third-party websites. We do not control
        or take responsibility for the content, privacy policies, or practices
        of any third-party websites. Inclusion of links does not imply
        endorsement.
      </p>

      <p>
        <strong>8. Governing Law &amp; Jurisdiction:</strong><br />
        These Terms shall be governed by Indian law. Any disputes shall be
        subject to the exclusive jurisdiction of the courts located in Pune,
        Maharashtra.
      </p>

      <p>
        <strong>9. Changes to Terms:</strong><br />
        We reserve the right to update these Terms at any time. Continued use of
        the Website after changes have been posted constitutes acceptance of the
        new Terms. You should review these Terms regularly.
      </p>
    </section>
  );
}
