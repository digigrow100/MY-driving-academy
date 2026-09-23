import Hero from "@/components/home/Hero";
import IntensiveStrip from "@/components/home/IntensiveStrip";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Gallery from "@/components/home/Gallery";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-primary-container px-4 py-8 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <IntensiveStrip />
        </div>
      </div>
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Gallery />
      <CTA />
    </>
  );
}
