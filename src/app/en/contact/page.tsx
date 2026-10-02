import ContactFormWrapper from "@/components/organisms/ContactFormWrapper";
import Hero from "@/components/Hero";
import { Mail, Phone, MapPin } from "lucide-react";

export default function EnContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Hero
        label="Contact"
        title={
          <>
            Let&apos;s Start Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
              Project!
            </span>
          </>
        }
        subtitle="Every project starts with a simple message. I'm available 9:00-17:00 on weekdays, but I often reply to emails on weekends too."
        cta1="Send Email"
        cta1Link="mailto:hello@webdude.hu"
        fullHeight={true}
        backgroundImage="/assets/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp"
      />

      <section className="max-w-6xl mx-auto px-6 relative z-10 py-24 bg-slate-950">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side: Heading and contact info */}
          <div className="space-y-12">
            <div>
              <div className="inline-block relative pl-6 mb-6">
                <span className="text-xs uppercase font-black tracking-[0.3em] text-[#00B5F1] mb-2 block">
                  Contact Information
                </span>
                <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#00B5F1] to-[#5B21B6]" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans text-white leading-tight tracking-tight mb-6">
                Let&apos;s Start Your{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic pr-4">
                  Project!
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed tracking-wide font-medium">
                Choose a contact method and let&apos;s discuss your ideas
                directly with me!
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Direct Contact Channels
              </h2>
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex items-center gap-6 group hover:border-[#00B5F1]/50 hover:shadow-[0_10px_30px_rgba(0,181,241,0.15)] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold block mb-1 text-slate-400">
                    Email Address
                  </span>
                  <a
                    href="mailto:hello@webdude.hu"
                    className="text-lg font-black text-[#00B5F1] hover:text-[#5B21B6] transition-colors tracking-tight"
                  >
                    hello@webdude.hu
                  </a>
                </div>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex items-center gap-6 group hover:border-[#00B5F1]/50 hover:shadow-[0_10px_30px_rgba(0,181,241,0.15)] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold block mb-1 text-slate-400">
                    Phone Number
                  </span>
                  <a
                    href="tel:+36703238003"
                    className="text-lg font-black text-[#00B5F1] hover:text-[#5B21B6] transition-colors tracking-tight"
                  >
                    +36 70 323 8003
                  </a>
                </div>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex items-center gap-6 group hover:border-[#00B5F1]/50 hover:shadow-[0_10px_30px_rgba(0,181,241,0.15)] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold block mb-1 text-slate-400">
                    Location & Availability
                  </span>
                  <span className="text-lg font-bold text-white tracking-tight">
                    Hungary (in person) & Remote partner serving clients
                    worldwide
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: ContactFormWrapper */}
          <div className="lg:sticky lg:top-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-slate-400">
                Fill out the form and I&apos;ll reply personally within 24
                hours!
              </p>
            </div>
            <ContactFormWrapper />
          </div>
        </div>
      </section>
    </div>
  );
}
