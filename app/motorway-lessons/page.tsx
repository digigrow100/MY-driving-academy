import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Motorway Lessons",
  description:
    "Specialized tuition for high-speed roads tailored for newly passed drivers looking to gain confidence on busy multi-lane networks.",
};

export default function MotorwayLessonsPage() {
  return (
    <ServicePage
      eyebrow="Master high-speed driving"
      title="Motorway Lessons"
      description="Specialized tuition for high-speed roads tailored for newly passed drivers looking to gain confidence and ensure maximum safety on busy multi-lane networks."
      imageUrl="/motorway-lessons.webp"
      imageAlt="A driver's-eye view of a car on the motorway approaching a junction with overhead direction signs."
      features={[
        {
          icon: "merge_type",
          title: "Joining & Leaving",
          description:
            "Master the art of safely accelerating on slip roads and merging seamlessly into high-speed traffic flow.",
        },
        {
          icon: "straighten",
          title: "Lane Discipline",
          description:
            "Learn correct positioning, understanding when to use which lane, and maintaining awareness of blind spots.",
        },
        {
          icon: "published_with_changes",
          title: "Overtaking Safely",
          description:
            "Develop the judgment required to overtake slower vehicles confidently and return to the driving lane safely.",
        },
        {
          icon: "speed",
          title: "Speed & Distance Management",
          description:
            "Understand how to maintain appropriate following distances at 70mph, anticipating hazards far ahead, and managing speed in changing weather conditions.",
          wide: true,
        },
        {
          icon: "psychology",
          title: "Confidence Building",
          description:
            "Overcome anxiety with patient, expert guidance focused on calm, decisive action.",
          tone: "dark",
        },
      ]}
    />
  );
}
