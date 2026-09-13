"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Trophy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import RoutePath from "./RoutePath";
import IntensiveStrip from "./IntensiveStrip";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !headline) return;

    let onMove: ((e: MouseEvent) => void) | null = null;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const split = new SplitType(headline, {
        types: "lines,words",
        tagName: "span",
      });
      split.lines?.forEach((line) => line.classList.add("split-line"));

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      if (imageWrap) {
        tl.set(imageWrap, { clipPath: "inset(6% 6% 100% 6% round 24px)" });
      }

      tl.from(
        ".hero-badge",
        { opacity: 0, y: 16, duration: 0.6 },
        0.1,
      )
        .from(
          split.words,
          { yPercent: 110, duration: 0.9, stagger: 0.045 },
          0.25,
        )
        .from(
          ".hero-copy",
          { opacity: 0, y: 24, duration: 0.7 },
          "-=0.5",
        )
        .from(
          ".hero-cta",
          { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        );

      if (imageWrap) {
        tl.to(
          imageWrap,
          { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.1 },
          0.35,
        ).from(
          ".hero-badge-card",
          { opacity: 0, scale: 0.85, y: 16, duration: 0.6 },
          "-=0.4",
        );
      }

      // Gentle scroll parallax on the hero photo.
      if (imageWrap) {
        gsap.to(imageWrap, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Subtle mouse-driven depth, desktop pointer devices only.
      if (window.matchMedia("(pointer: fine)").matches && imageWrap) {
        const moveImage = gsap.quickTo(imageWrap, "x", {
          duration: 0.8,
          ease: "power3.out",
        });
        const moveGlow = glowRef.current
          ? gsap.quickTo(glowRef.current, "x", {
              duration: 1.2,
              ease: "power3.out",
            })
          : null;

        onMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          moveImage(relX * 16);
          moveGlow?.(relX * -24);
        };
        section.addEventListener("mousemove", onMove);
      }
    }, section);

    return () => {
      if (onMove) section.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-primary-container py-20 md:py-28 lg:py-32"
    >
      <div
        ref={glowRef}
        className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none animate-glow-drift"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] bg-primary-fixed/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <RoutePath className="hidden lg:block absolute top-0 right-[8%] h-full w-24 text-on-primary/10 pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="hero-badge inline-block bg-secondary-container/20 text-secondary-container px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-secondary-container/30">
              Premium Driving Tuition · Leicester, UK
            </div>
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-on-primary mb-6 leading-tight"
            >
              Learn to Drive with{" "}
              <span className="text-secondary-container">Confidence</span>
            </h1>
            <p className="hero-copy text-lg text-on-primary/85 max-w-xl mx-auto lg:mx-0 mb-8">
              Ready to start your driving journey? At MY Driving Academy, we
              make learning smooth, enjoyable, and stress-free from day one.
              Our expert instructors guide you step by step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              <Link
                href="#contact"
                className="hero-cta bg-secondary-container text-on-secondary-fixed-variant font-semibold text-sm px-8 py-4 rounded-lg hover:bg-secondary-fixed-dim transition-colors duration-200 w-full sm:w-auto text-center shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container"
              >
                Start Your Journey
              </Link>
              <Link
                href="#services"
                className="hero-cta border-2 border-on-primary/50 text-on-primary font-semibold text-sm px-8 py-4 rounded-lg hover:bg-on-primary/10 hover:border-on-primary transition-colors w-full sm:w-auto text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-md mx-auto lg:max-w-none">
            {/* Decorative L-plate */}
            <div
              className="hidden sm:flex absolute -top-6 -left-6 z-20 w-14 h-14 rounded-lg bg-surface border-2 border-error items-center justify-center shadow-lg animate-float"
              style={{ ["--float-rotate" as string]: "-8deg" }}
              aria-hidden="true"
            >
              <span className="text-error font-black text-2xl">L</span>
            </div>

            <div
              ref={imageWrapRef}
              className="relative rounded-2xl overflow-hidden ambient-shadow aspect-[4/5] sm:aspect-[5/4]"
            >
              <Image
                src="/hero-banner.webp"
                alt="A blue car with an MY Driving Academy L-plate parked on a sunlit residential street"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
            </div>

            <div className="hero-badge-card hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3 bg-surface rounded-xl ambient-shadow border border-outline-variant/30 px-5 py-4">
              <div className="w-11 h-11 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-bold text-primary-container leading-none">
                  10+ Years
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  of Driving Excellence
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <IntensiveStrip />
        </div>
      </div>

      <div
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-on-primary/50"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-scroll-hint" />
      </div>
    </section>
  );
}
