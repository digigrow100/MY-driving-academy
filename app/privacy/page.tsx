import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { PHONE_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MY Driving Academy collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="26 August 2026"
      intro="This policy explains what personal information MY Driving Academy collects, how we use it, and the choices you have. We only collect what we need to provide safe, well-organized driving tuition."
      sections={[
        {
          heading: "Information We Collect",
          body: [
            "When you contact us or make a booking, we may collect your name, phone number, and details relevant to scheduling lessons, such as your address or preferred pickup location.",
          ],
        },
        {
          heading: "How We Use Your Information",
          body: [
            "We use your information to schedule and deliver lessons, communicate about bookings, and respond to enquiries. We do not sell your personal information to third parties.",
          ],
        },
        {
          heading: "Data Retention",
          body: [
            "We retain booking and contact information only as long as necessary to provide our services and meet legal or accounting obligations, after which it is securely deleted.",
          ],
        },
        {
          heading: "Your Rights",
          body: [
            `You can ask us at any time to access, correct, or delete the personal information we hold about you by phone or WhatsApp on ${PHONE_DISPLAY}.`,
          ],
        },
        {
          heading: "Cookies",
          body: [
            "Our website may use minimal, essential cookies to support core functionality. We do not use tracking cookies for advertising purposes.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `For any privacy-related questions, reach out to us by phone or WhatsApp on ${PHONE_DISPLAY}.`,
          ],
        },
      ]}
    />
  );
}
