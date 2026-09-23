import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Driving Lessons",
  description:
    "Standard weekly driving lessons tailored to your pace with a DVSA-qualified trainer in a fully dual-controlled car across Leicester.",
};

export default function DrivingLessonsPage() {
  return (
    <ServicePage
      eyebrow="Learn at your own pace"
      title="Driving Lessons"
      description="Standard weekly lessons tailored to your specific learning pace and comfort level. DVSA-qualified trainer builds a plan matching your learning style and confidence in a fully dual-controlled car across Leicester."
      imageUrl="/driving-lessons.webp"
      imageAlt="A driving trainer smiling and pointing ahead while a young student confidently drives."
      features={[
        {
          icon: "schedule",
          title: "Flexible Slots",
          description:
            "Flexible 1-hour or 1.5-hour slots available 7AM–11PM, 7 days a week.",
          wide: true,
        },
        {
          icon: "workspace_premium",
          title: "Expert Trainer",
          description: "DVSA-qualified, patient trainer.",
        },
        {
          icon: "directions_car",
          title: "Modern Vehicle",
          description: "Learn in a modern dual-control car.",
        },
        {
          icon: "location_on",
          title: "Service Area",
          description:
            "Providing comprehensive driving lessons across Leicester and surrounding areas.",
          wide: true,
        },
      ]}
    />
  );
}
