import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { PHONE_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions for booking lessons and courses with MY Driving Academy.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="26 August 2026"
      intro="These terms govern your use of the MY Driving Academy website and any lessons, courses, or bookings made with us. By booking a lesson or using this site, you agree to the terms below."
      sections={[
        {
          heading: "Bookings & Payment",
          body: [
            "Lessons, block bookings, and intensive courses must be booked and paid for in advance unless otherwise agreed in writing. Prices are as advertised at the time of booking and are subject to change for future bookings.",
          ],
        },
        {
          heading: "Cancellations",
          body: [
            "We ask for at least 48 hours' notice to cancel or reschedule a lesson. Lessons cancelled with less notice, or missed without notice, may be charged in full at the instructor's discretion.",
          ],
        },
        {
          heading: "Instructor Conduct",
          body: [
            "All instructors are DVSA-qualified and undergo regular vehicle safety checks. Lessons take place in fully insured, dual-control vehicles. Students are expected to follow instructor guidance for the safety of all road users.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "While every reasonable precaution is taken to ensure safety during lessons, driving inherently carries risk. MY Driving Academy maintains appropriate insurance cover for tuition vehicles and instructors.",
          ],
        },
        {
          heading: "Changes to These Terms",
          body: [
            "We may update these terms from time to time. Continued use of our services after changes are posted constitutes acceptance of the revised terms.",
          ],
        },
        {
          heading: "Contact",
          body: [
            `Questions about these terms can be sent to us by phone or WhatsApp on ${PHONE_DISPLAY}.`,
          ],
        },
      ]}
    />
  );
}
