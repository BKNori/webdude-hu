import Link from "next/link";
import { ArrowRight, Search, Globe, Wrench, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 - Az oldal nem található | WebDude",
  description: "A keresett oldal nem található, de a Te weboldaladat rendbe tudjuk tenni. Ismerd meg szolgáltatásainkat vagy lépj kapcsolatba velünk!",
};

export default function NotFound() {
  const quickServices = [
    {
      title: "Weboldal Készítés",
      desc: "Modern, villámgyors Next.js alapú honlapok és konverziós gépezetek.",
      href: "/szolgaltatasok/weboldal-keszites",
      icon: Globe,
    },
    {
      title: "WordPress Karbantartás & Hibajavítás",
      desc: "Feltört, leállt vagy hibás oldalak azonnali helyreállítása.",
      href: "/szolgaltatasok/wordpress-karbantartas",
      icon: Wrench,
    },
    {
      title: "Technikai SEO Audit",
      desc: "Derítsd ki, mi gátolja a weboldaladat a Google élére kerülésben.",
      href: "/szolgaltatasok/technikai-seo-audit",
      icon: Search,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-br from-[#00B5F1]/15 to-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl w-full text-center relative z-10">
        {/* Error badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-[#00B5F1] text-xs font-mono font-bold tracking-wider mb-6">
          HIBAKÓD: 404
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
          Ezt az oldalt nem találjuk, de a Te weboldaladat{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#a855f7]">
            rendbe tudjuk tenni!
          </span>
        </h1>

        <p className="text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
          Úgy tűnik, a keresett link megszűnt vagy elgépelted a címet. Ne menj el üres kézzel: nézd meg, miben tudok segíteni a vállalkozásodnak!
        </p>

        {/* Quick Service Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
          {quickServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-[#00B5F1]/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-white mb-1 group-hover:text-[#00B5F1] transition-colors">
                  {service.title}
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.desc}
                </p>
              </Link>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/kapcsolat"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-xl shadow-sky-950/60 transition-all duration-300 group w-full sm:w-auto"
          >
            Egyedi árajánlat kérése
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Vissza a főoldalra
          </Link>
        </div>
      </div>
    </div>
  );
}
