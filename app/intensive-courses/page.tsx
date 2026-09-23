import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Intensive Courses",
  description:
    "Concentrated daily driving programs (3/5/7/10-day options) for rapid skill gain and quicker test dates.",
};

export default function IntensiveCoursesPage() {
  return (
    <ServicePage
      eyebrow="Fast-track your driving success"
      title="Intensive Courses"
      description="Concentrated daily driving programs (3/5/7/10-day options) for rapid skill gain and quicker test dates. Perfect for those who need their license fast."
      imageUrl="/intensive-courses.webp"
      imageAlt="A driver's-eye view approaching a busy roundabout with both hands on the steering wheel."
      includedSubtitle="Everything you need to succeed, packed into a focused timeframe."
      features={[
        {
          icon: "calendar_month",
          title: "Flexible Durations",
          description:
            "Choice of 3, 5, 7 or 10-day courses tailored to your current experience level.",
        },
        {
          icon: "directions_car",
          title: "Daily Lessons",
          description:
            "Structured daily driving lessons to build muscle memory and confidence rapidly.",
        },
        {
          icon: "verified_user",
          title: "Expert Instruction",
          description:
            "Learn from a patient, DVSA-qualified trainer committed to your success.",
        },
        {
          icon: "fact_check",
          title: "Mock Test Included",
          description:
            "A realistic practice run to prepare you mentally and practically for the real thing.",
        },
        {
          icon: "event_available",
          title: "Booking Assistance",
          description:
            "We assist with fast-tracking your practical test booking to align with your course end date.",
        },
      ]}
    />
  );
}
