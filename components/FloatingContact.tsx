import { Phone } from "lucide-react";
import { PHONE_TEL, WHATSAPP_URL } from "@/lib/contact";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

/** Always-visible call/WhatsApp shortcuts, fixed to the bottom-right on
 * every page. Sits below BackToTop's position so the two never overlap. */
export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        title="WhatsApp us"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
      <a
        href={PHONE_TEL}
        aria-label="Call us"
        title="Call us"
        className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-fixed-variant shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
      >
        <Phone className="w-6 h-6" aria-hidden="true" />
      </a>
    </div>
  );
}
