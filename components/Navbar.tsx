"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav, services } from "@/lib/nav";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setOpen((v) => {
      const next = !v;
      if (!next) setMobileServicesOpen(false);
      return next;
    });
  };

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

  const isOnServicePage = services.some((s) => pathname === `/${s.slug}`);

  const renderDesktopItem = (item: (typeof mainNav)[number]) => {
    if (item.label !== "Services") {
      return (
        <Link
          href={item.href}
          aria-current={isActive(item.href) ? "page" : undefined}
          className={navLinkClasses(item.href)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div className="relative group py-1 -my-1">
        <Link
          href={item.href}
          aria-current={isOnServicePage ? "page" : undefined}
          className={`inline-flex items-center gap-1 ${navLinkClasses(item.href)} ${
            isOnServicePage
              ? `${transparent ? "text-on-primary" : "text-primary"} after:w-full`
              : ""
          }`}
        >
          {item.label}
          <ChevronDown
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
            aria-hidden="true"
          />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 opacity-0 invisible -translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
          <div className="bg-surface rounded-xl shadow-xl border border-outline-variant/30 py-2 overflow-hidden">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                aria-current={pathname === `/${service.slug}` ? "page" : undefined}
                className={`block px-4 py-2.5 text-sm transition-colors ${
                  pathname === `/${service.slug}`
                    ? "text-primary bg-surface-container"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                }`}
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

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
        className={`relative flex items-center justify-between px-4 md:px-10 max-w-[1200px] mx-auto transition-[padding] duration-300 ${
          scrolled ? "py-2 md:min-h-12" : "py-3 md:py-4 md:min-h-16"
        }`}
      >
        <nav aria-label="Primary" className="hidden md:flex gap-8 items-center">
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
              {renderDesktopItem(item)}
            </motion.div>
          ))}
        </nav>

        <Link
          href="/"
          className="flex items-center hover:opacity-85 transition-opacity md:absolute md:left-1/2 md:-translate-x-1/2"
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

        <nav aria-label="Secondary" className="hidden md:flex gap-8 items-center">
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
              {renderDesktopItem(item)}
            </motion.div>
          ))}
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={toggleMobileMenu}
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
              {mainNav.map((item) => {
                if (item.label !== "Services") {
                  return (
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
                  );
                }

                return (
                  <div key={item.href}>
                    <div
                      className={`flex items-center rounded-lg transition-colors ${
                        isOnServicePage
                          ? "bg-surface-container text-primary"
                          : "text-on-surface-variant"
                      }`}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isOnServicePage ? "page" : undefined}
                        className="flex-1 font-medium py-3 px-3 rounded-lg hover:bg-surface-container hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-submenu"
                        aria-label={
                          mobileServicesOpen ? "Collapse services list" : "Expand services list"
                        }
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        className="p-3 rounded-lg hover:bg-surface-container hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          id="mobile-services-submenu"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 py-1 flex flex-col gap-0.5">
                            {services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/${service.slug}`}
                                onClick={() => setOpen(false)}
                                aria-current={
                                  pathname === `/${service.slug}` ? "page" : undefined
                                }
                                className={`text-sm py-2.5 px-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                                  pathname === `/${service.slug}`
                                    ? "text-primary bg-surface-container"
                                    : "text-on-surface-variant hover:bg-surface-container hover:text-secondary"
                                }`}
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
