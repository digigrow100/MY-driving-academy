import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { legalNav, mainNav, services } from "@/lib/nav";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/contact";
import Reveal from "@/components/Reveal";
import BackToTop from "@/components/BackToTop";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const linkClasses =
  "relative w-fit text-sm text-on-primary-container/75 transition-colors duration-200 hover:text-secondary-fixed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-fixed rounded-sm after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-secondary-fixed after:transition-all after:duration-300 hover:after:w-full";

export default function Footer() {
  return (
    <footer className="w-full bg-primary-container mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 pt-14 pb-8">
        <Reveal className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <span className="bg-surface rounded-lg p-1.5 shadow-sm shrink-0">
                <Image
                  src="/site-icon.png"
                  alt=""
                  width={318}
                  height={313}
                  className="h-8 w-8"
                />
              </span>
              <span className="text-xl font-bold text-on-primary-container tracking-tight">
                MY Driving Academy
              </span>
            </Link>
            <p className="text-sm text-on-primary-container/75 max-w-xs leading-relaxed">
              Professional, patient, and modern driving tuition for the next
              generation of safe drivers.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href={PHONE_TEL}
                className={`flex items-center gap-2 ${linkClasses}`}
              >
                <Phone className="w-[18px] h-[18px]" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 ${linkClasses}`}
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                WhatsApp us
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-primary-container/50 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-primary-container/50 mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/${service.slug}`} className={linkClasses}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-primary-container/50 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-12 pt-6 border-t border-on-primary-container/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-on-primary-container/50">
            © {new Date().getFullYear()} MY Driving Academy. All rights
            reserved.
          </p>
          <p className="text-xs text-on-primary-container/50">
            5+ Years Experience · DVSA-Qualified Trainers · Leicester, UK
          </p>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
