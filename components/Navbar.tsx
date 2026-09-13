"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/lib/nav";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Only the homepage opens on a dark, full-bleed hero - everywhere else
  // the header sits over light content from the first pixel, so it must
  // stay in its solid/legible state rather than start transparent.
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Only mark a nav item "current" when its href is a real route matching
  // the page we're on. Same-page anchor links (About/Services/Contact all
  // resolve their path portion to "/") never get marked active - without
  // scroll-spy there's no reliable way to know which section is in view,
  // and matching all of them at once (as a naive path-prefix check would)
  // reads as a bug, not a feature.
  const isActive = (href: string) => !href.includes("#") && href === pathname;

  // Desktop: the logo sits centered, flanked by the nav split into two
  // even halves either side of it. Mobile keeps the simple logo-left,
  // hamburger-right row (the split halves are hidden, not reflowed -
  // the full list still appears together in the slide-down menu below).
  const half = Math.ceil(mainNav.length / 2);
  const leftNav = mainNav.slice(0, half);
  const rightNav = mainNav.slice(half);

  const navLinkClasses = (href: string) =>
    `relative text-sm font-medium py-1 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:rounded-full after:transition-all after:duration-300 after:ease-out ${
      transparent
        ? "text-on-primary after:bg-secondary-container"
        : "text-on-surface-variant hover:text-primary after:bg-secondary"
    } ${
      isActive(href)
        ? `${transparent ? "text-on-primary" : "text-primary"} after:w-full`
        : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-surface/95 backdrop-blur-md shadow-[0_2px_16px_rgba(11,31,58,0.08)]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 px-4 md:px-10 max-w-[1200px] mx-auto transition-[padding] duration-300 ${
          scrolled ? "py-2" : "py-3 md:py-4"
        }`}
      >
        <nav
          aria-label="Primary"
          className="hidden md:flex gap-8 items-center justify-end"
        >
          {leftNav.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={navLinkClasses(item.href)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <Link
          href="/"
          className="flex items-center hover:opacity-85 transition-opacity"
        >
          <Image
            src="/logo.webp"
            alt="MY Driving Academy"
            width={1303}
            height={434}
            priority
            className={`w-auto transition-[height] duration-300 ${
              scrolled ? "h-10 md:h-12" : "h-12 md:h-16"
            } ${transparent ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <div className="hidden md:flex items-center justify-start gap-8">
          <nav aria-label="Secondary" className="flex gap-8 items-center">
            {rightNav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + (leftNav.length + i) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={navLinkClasses(item.href)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="#contact"
              className={`inline-flex items-center font-semibold text-sm px-6 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${
                transparent
                  ? "bg-secondary-container text-on-secondary-fixed-variant hover:bg-secondary-fixed-dim focus-visible:ring-offset-transparent"
                  : "bg-primary-container text-on-primary hover:bg-primary focus-visible:ring-offset-surface"
              }`}
            >
              Book Lessons
            </Link>
          </motion.div>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 -mr-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
            transparent ? "text-on-primary" : "text-primary"
          }`}
        >
          {open ? (
            <X className="w-7 h-7" aria-hidden="true" />
          ) : (
            <Menu className="w-7 h-7" aria-hidden="true" />
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-surface border-t border-outline-variant/30 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`font-medium py-3 px-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                    isActive(item.href)
                      ? "bg-surface-container text-primary"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center bg-primary-container text-on-primary font-semibold text-sm px-6 py-3 rounded-lg hover:bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                Book Lessons
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
