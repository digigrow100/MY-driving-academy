"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { galleryImages } from "@/lib/homeData";
import GalleryTile from "./GalleryTile";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

      // Scope to the desktop/tablet grid only - the mobile snap-scroll
      // gallery stays simple with no scroll-linked JS, per its own group.
      if (!gridRef.current) return;
      const tiles = gsap.utils.toArray<HTMLElement>(
        gridRef.current.querySelectorAll("[data-gallery-tile]"),
      );
      tiles.forEach((tile, i) => {
        gsap.from(tile, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          delay: (i % 4) * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: tile, start: "top 92%" },
        });

        const image = tile.querySelector<HTMLElement>("[data-gallery-image]");
        if (image) {
          gsap.fromTo(
            image,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: tile, start: "top 92%" },
            },
          );
          // Slightly different parallax speed per column for depth.
          gsap.to(image, {
            yPercent: 6 + (i % 3) * 4,
            ease: "none",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Gallery
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-container mb-4">
            Life at MY Driving Academy
          </h2>
          <p className="text-on-surface-variant">
            A look at our students, trainers, and vehicles out on the
            road.
          </p>
        </div>

        {/* Desktop / tablet: mixed-size editorial grid */}
        <div
          ref={gridRef}
          className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[200px]"
        >
          {galleryImages.map((image) => (
            <GalleryTile
              key={image.src}
              image={image}
              className={image.wide ? "col-span-2 row-span-2" : ""}
              sizes={
                image.wide
                  ? "(min-width: 768px) 50vw, 100vw"
                  : "(min-width: 768px) 25vw, 50vw"
              }
            />
          ))}
        </div>

        {/* Mobile: horizontal snap-scroll gallery */}
        <div
          className="sm:hidden -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Photo gallery, swipe to browse"
        >
          {galleryImages.map((image) => (
            <div key={image.src} className="shrink-0 w-[78%] snap-center">
              <GalleryTile
                image={image}
                className="aspect-[4/3]"
                sizes="78vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
