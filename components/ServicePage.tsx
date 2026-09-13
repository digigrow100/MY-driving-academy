import Image from "next/image";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/contact";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export type Feature = {
  icon: string;
  title: string;
  description: string;
  wide?: boolean;
  tone?: "default" | "accent" | "dark";
};

type ServicePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  includedTitle?: string;
  includedSubtitle?: string;
  features: Feature[];
};

function toneClasses(tone: Feature["tone"]) {
  switch (tone) {
    case "accent":
      return "bg-secondary-fixed/30";
    case "dark":
      return "bg-primary-container text-on-primary";
    default:
      return "bg-surface-container-lowest border border-outline-variant/30";
  }
}

export default function ServicePage({
  eyebrow,
  title,
  description,
  imageUrl,
  imageAlt,
  includedTitle = "What's Included",
  includedSubtitle,
  features,
}: ServicePageProps) {
  return (
    <>
      <section className="px-4 md:px-10 py-12 md:py-16 max-w-[1200px] mx-auto">
        <Link
          href="/#services"
          className="inline-flex items-center text-on-surface-variant font-medium hover:text-primary transition-colors mb-6 group"
        >
          <span className="material-symbols-outlined mr-2 text-[18px] group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-surface-container-high text-primary font-semibold text-sm px-4 py-2 rounded-full mb-6 border border-surface-dim">
              {eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-on-surface-variant mb-8 leading-relaxed max-w-2xl">
              {description}
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center bg-secondary-container text-on-secondary-container font-semibold text-sm px-8 py-4 rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
            >
              Book This Course
              <span className="material-symbols-outlined ml-2">
                calendar_month
              </span>
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden ambient-shadow relative aspect-square lg:aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-12 md:py-16 px-4 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
              {includedTitle}
            </h2>
            {includedSubtitle && (
              <p className="text-on-surface-variant">{includedSubtitle}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`rounded-2xl p-8 ambient-shadow hover:-translate-y-1 transition-transform duration-300 flex flex-col ${toneClasses(
                  feature.tone,
                )} ${feature.wide ? "md:col-span-2" : ""}`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    feature.tone === "dark"
                      ? "bg-surface-tint/30"
                      : "bg-surface-container"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined fill ${
                      feature.tone === "dark" ? "text-on-primary" : "text-primary"
                    }`}
                  >
                    {feature.icon}
                  </span>
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    feature.tone === "dark" ? "text-on-primary" : "text-primary"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={
                    feature.tone === "dark"
                      ? "text-on-primary-container/90"
                      : "text-on-surface-variant"
                  }
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-12 md:py-16 px-4 md:px-10 max-w-[1200px] mx-auto"
        id="contact"
      >
        <div className="bg-primary-container rounded-2xl p-8 md:p-16 text-center ambient-shadow relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold text-on-primary-container mb-4">
            Ready to start driving?
          </h2>
          <p className="text-lg text-on-primary-container/80 mb-8 max-w-xl mx-auto">
            Contact us today to book your first lesson and begin your journey
            to becoming a confident driver.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center bg-secondary-container text-on-secondary-container font-semibold text-sm px-8 py-4 rounded-lg hover:bg-secondary-fixed-dim transition-colors shadow-sm"
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-on-primary-container/40 text-on-primary-container font-semibold text-sm px-8 py-4 rounded-lg hover:bg-on-primary-container/10 hover:border-on-primary-container transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
