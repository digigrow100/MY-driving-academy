import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Refresher Classes",
  description:
    "Targeted sessions for drivers getting back on the road after a break. Patient, judgment-free instruction tailored to rebuild your confidence.",
};

export default function RefresherClassesPage() {
  return (
    <ServicePage
      eyebrow="Get back behind the wheel safely"
      title="Refresher Classes"
      description="Targeted sessions for drivers getting back on the road after a break. Patient, judgment-free instruction tailored to rebuild your confidence at your own pace."
      imageUrl="/refresher-classes.webp"
      imageAlt="A mature adult student driving while a calm trainer chats with them in the passenger seat."
      includedSubtitle="Our refresher courses are designed to address your specific needs, focusing on the areas where you want to regain confidence."
      features={[
        {
          icon: "assignment",
          title: "1. Skills Assessment",
          description:
            "We begin with a low-pressure evaluation to understand your current driving level and identify specific areas that need refreshing, ensuring a personalized lesson plan.",
          wide: true,
        },
        {
          icon: "psychology",
          title: "2. Confidence Rebuilding",
          description:
            "Gradual exposure to challenging traffic situations, focusing on reducing anxiety and building safe, decisive driving habits.",
          tone: "dark",
        },
        {
          icon: "menu_book",
          title: "3. Highway Code Refresh",
          description:
            "A thorough review of recent changes to road laws, signage, and right-of-way rules to ensure you are legally compliant and safe.",
        },
        {
          icon: "schedule",
          title: "4. Flexible Short Sessions",
          description:
            "Book lessons that fit your schedule. We offer shorter, focused sessions designed to prevent fatigue while maximizing learning retention.",
        },
        {
          icon: "handshake",
          title: "5. Patient Trainer",
          description:
            "Learn with highly trained professionals who specialize in nervous or returning drivers, providing a completely judgment-free environment.",
        },
      ]}
    />
  );
}
