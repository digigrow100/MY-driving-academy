"use client";

import { useRef } from "react";
import Image from "next/image";
import { Award, Car, Clock, Heart, Trophy, type LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { whyUs } from "@/lib/homeData";
import RoutePath from "./RoutePath";
import Stats from "./Stats";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, LucideIcon> = {
  workspace_premium: Award,
  spa: Heart,
  directions_car: Car,
  schedule: Clock,
};

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
      });

      // Image mask reveal + gentle internal parallax.
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(0 0 100% 0 round 16px)" },
          {
            clipPath: "inset(0 0 0% 0 round 16px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: imageColRef.current, start: "top 85%" },
          },
        );
        const img = imageRef.current.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: imageColRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }

      gsap.from(badgeRef.current, {
        opacity: 0,
        scale: 0.7,
        rotate: -12,
        duration: 0.7,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: badgeRef.current, start: "top 90%" },
      });

      const items = gsap.utils.toArray<HTMLElement>(".benefit-item");
      gsap.from(items, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: benefitsRef.current, start: "top 80%" },
      });

      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: benefitsRef.current,
              start: "top 75%",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );
      }

      // Desktop-only: pin the image while the benefits column scrolls past.
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          ScrollTrigger.create({
            trigger: section,
            start: "top 100px",
            end: "bottom bottom",
            pin: imageColRef.current,
            pinSpacing: false,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 bg-primary-container overflow-hidden"
      id="about"
    >
      <div
        className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-fixed/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <RoutePath className="hidden lg:block absolute -bottom-10 left-[6%] h-2/3 w-20 text-on-primary/10 pointer-events-none rotate-180" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-10">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block bg-secondary-container/20 text-secondary-container px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm border border-secondary-container/30">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-primary mb-4">
            The Trusted Way to Learn to Drive
          </h2>
          <p className="text-on-primary/75">
            We believe learning to drive should be an exciting, empowering
            experience. Our curriculum is designed not just to help you pass
            your test, but to make you a safe, confident driver for life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div ref={imageColRef} className="relative lg:pb-10">
            <div
              ref={imageRef}
              className="rounded-2xl overflow-hidden ambient-shadow h-[320px] sm:h-[420px] relative"
            >
              <Image
                src="/why-choose-us.webp"
                alt="A friendly driving instructor smiling and waving from the driver's seat, ready to welcome a new student."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              ref={badgeRef}
              className="hidden sm:flex absolute -bottom-6 -right-6 items-center gap-3 bg-surface rounded-xl ambient-shadow border border-outline-variant/30 px-5 py-4"
            >
              <div className="w-11 h-11 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-bold text-primary-container leading-none">
                  98%
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  First-Time Pass Rate
                </p>
              </div>
            </div>
          </div>

          <div ref={benefitsRef} className="relative">
            <div
              className="absolute left-[21px] top-1 bottom-1 w-px bg-on-primary/15"
              aria-hidden="true"
            />
            <div
              ref={lineFillRef}
              className="absolute left-[21px] top-1 w-px bg-secondary-container"
              style={{ height: 0 }}
              aria-hidden="true"
            />
            <div className="space-y-6">
              {whyUs.map((item) => {
                const Icon = ICONS[item.icon] ?? Award;
                return (
                  <div key={item.title} className="benefit-item relative pl-16">
                    <div className="absolute left-0 top-0 w-11 h-11 rounded-full bg-primary-container border-2 border-secondary-container/60 flex items-center justify-center text-secondary-container">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="bg-surface/10 backdrop-blur-sm rounded-xl p-5 border border-on-primary/10 hover:bg-surface/15 transition-colors duration-300">
                      <h3 className="font-semibold text-on-primary mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-on-primary/70 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Stats />
      </div>
    </section>
  );
}
