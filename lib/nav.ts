export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "#contact" },
];

export const legalNav = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export type Service = {
  slug: string;
  name: string;
  icon: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
};

export const services: Service[] = [
  {
    slug: "driving-lessons",
    name: "Driving Lessons",
    icon: "swipe_left_alt",
    image: "/driving-lessons.webp",
    imageAlt:
      "A driving instructor smiling while a young student confidently drives.",
    tagline: "Learn at your own pace",
    description:
      "Standard 1 or 2-hour lessons tailored to your pace, perfect for steady progression.",
  },
  {
    slug: "intensive-courses",
    name: "Intensive Courses",
    icon: "rocket_launch",
    image: "/intensive-courses.webp",
    imageAlt: "A driver's-eye view approaching a busy roundabout.",
    tagline: "Fast-track your driving success",
    description:
      "Fast-track your learning with our 3 to 10-day intensive packages designed for rapid success.",
  },
  {
    slug: "block-bookings",
    name: "Block Bookings",
    icon: "calendar_month",
    image: "/block-bookings.webp",
    imageAlt:
      "A car dashboard with keys, a booking calendar, and a navy branded notebook.",
    tagline: "Premium tuition, exceptional value",
    description:
      "Save money by booking 10, 20, or 30 hours in advance. Ideal for committed learners.",
  },
  {
    slug: "test-prep",
    name: "Test Prep",
    icon: "assignment_turned_in",
    image: "/test-prep.webp",
    imageAlt:
      "A student sitting in a car reading a driving theory book outside a test centre.",
    tagline: "Enter your test with confidence",
    description:
      "Focused mock tests and route familiarization to ensure you are fully prepared for the big day.",
  },
  {
    slug: "motorway-lessons",
    name: "Motorway Lessons",
    icon: "add_road",
    image: "/motorway-lessons.webp",
    imageAlt:
      "A driver's-eye view of a car on the motorway approaching a junction with overhead direction signs.",
    tagline: "Master high-speed driving",
    description:
      "Build confidence at high speeds with specialized instruction on motorway driving.",
  },
  {
    slug: "refresher-classes",
    name: "Refresher Classes",
    icon: "autorenew",
    image: "/refresher-classes.webp",
    imageAlt:
      "A mature adult student driving while a calm instructor chats with them.",
    tagline: "Get back behind the wheel safely",
    description:
      "Been a while since you drove? Brush up on your skills and regain your confidence on the road.",
  },
];
