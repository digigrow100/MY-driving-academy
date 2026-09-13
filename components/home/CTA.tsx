"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Award,
  CalendarCheck,
  CarFront,
  Clock,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/contact";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import MagneticLink from "./MagneticLink";

gsap.registerPlugin(ScrollTrigger);

const trustBadges: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "DVSA-Qualified" },
  { icon: Award, label: "98% Pass Rate" },
  { icon: CarFront, label: "Dual-Control Cars" },
  { icon: Clock, label: "7 Days a Week" },
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading || reducedMotion) return;

    const ctx = gsap.context(() => {
      const split = new SplitType(heading, { types: "lines,words", tagName: "span" });
      split.lines?.forEach((line) => line.classList.add("split-line"));

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 70%" },
        defaults: { ease: "power3.out" },
      });

      tl.from(".cta-badge", { opacity: 0, y: 16, duration: 0.5 })
        .from(split.words, { yPercent: 110, duration: 0.8, stagger: 0.04 }, "-=0.2")
        .from(".cta-copy", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".cta-action", { opacity: 0, y: 16, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".cta-trust", { opacity: 0, y: 12, duration: 0.4, stagger: 0.08 }, "-=0.2");
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      id="contact"
    >
      <Image
        src="/motorway-lessons.webp"
        alt="A driver's-eye view of a car approaching a motorway slip road."
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary-container/90 to-primary/95" />
      <div
        className="absolute -top-32 left-1/3 w-[32rem] h-[32rem] bg-secondary/20 rounded-full blur-3xl pointer-events-none animate-glow-drift"
        aria-hidden="true"
      />
      {/* Moving road-line pattern */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none opacity-30"
        aria-hidden="true"
      >
        <svg
          className="w-[200%] h-full"
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="20"
            x2="400"
            y2="20"
            stroke="var(--color-secondary-container)"
            strokeWidth="2"
            strokeDasharray="18 18"
            className="animate-route-dash"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto px-4 md:px-10 text-center">
        <span className="cta-badge inline-block bg-secondary-container/20 text-secondary-container px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-secondary-container/30">
          Start Today
        </span>
        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl font-bold text-on-primary mb-5 leading-tight"
        >
          Ready to Start Your Driving Journey?
        </h2>
        <p className="cta-copy text-lg text-on-primary/85 mb-10 max-w-xl mx-auto">
          Get in touch and one of our friendly instructors will help you find
          the right course to get you on the road with confidence.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-14">
          <MagneticLink
            href="mailto:hello@mydrivingacademy.com"
            className="cta-action inline-flex items-center justify-center bg-secondary-container text-on-secondary-fixed-variant font-semibold text-sm px-8 py-4 rounded-lg hover:bg-secondary-fixed-dim transition-colors duration-200 shadow-lg w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            Book Your First Lesson
            <CalendarCheck className="w-4 h-4 ml-2" aria-hidden="true" />
          </MagneticLink>
          <MagneticLink
            href={PHONE_TEL}
            className="cta-action inline-flex items-center justify-center border-2 border-on-primary/40 text-on-primary font-semibold text-sm px-8 py-4 rounded-lg hover:bg-on-primary/10 hover:border-on-primary transition-colors w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <Phone className="w-4 h-4 mr-2 animate-float" style={{ ["--float-rotate" as string]: "0deg" }} aria-hidden="true" />
            {PHONE_DISPLAY}
          </MagneticLink>
          <MagneticLink
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-action inline-flex items-center justify-center border-2 border-on-primary/40 text-on-primary font-semibold text-sm px-8 py-4 rounded-lg hover:bg-on-primary/10 hover:border-on-primary transition-colors w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            WhatsApp Us
          </MagneticLink>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-8 border-t border-on-primary/15">
          {trustBadges.map((item) => (
            <div
              key={item.label}
              className="cta-trust flex items-center gap-2 text-on-primary/80 text-sm font-medium"
            >
              <item.icon className="w-4 h-4 text-secondary-container" aria-hidden="true" />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
