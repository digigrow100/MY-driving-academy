"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import SplitType from "split-type";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const split = new SplitType(headline, {
        types: "lines,words",
        tagName: "span",
      });
      split.lines?.forEach((line) => line.classList.add("split-line"));

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(split.words, { yPercent: 110, duration: 0.9, stagger: 0.045 }, 0.1)
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-[85vh] flex items-center justify-center"
    >
      <Image
        src="/hero-banner.webp"
        alt="A blue car with an MY Driving Academy L-plate parked on a sunlit residential street"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary/60" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center flex flex-col items-center">
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-on-primary mb-8 leading-tight"
        >
          Pass Your Driving Test with{" "}
          <span className="text-secondary-container">Confidence</span>
        </h1>
        <Link
          href="#contact"
          className="hero-cta bg-secondary-container text-on-secondary-fixed-variant font-semibold text-sm px-8 py-4 rounded-lg hover:bg-secondary-fixed-dim transition-colors duration-200 text-center shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container"
        >
          Start Your Journey
        </Link>
      </div>
    </section>
  );
}
