import { ComponentType } from "react";
import { Language } from "@/types/dictionary";
import { NAV_ITEMS_EN } from "./navigation.en";
import {
  Bot,
  Image as ImageIcon,
  Sparkles,
  Globe,
  ShoppingBag,
  MapPin,
  Search,
  TrendingUp,
  Palette,
  Layout,
  Copy,
  Wrench,
  Zap,
  ShieldAlert,
  RefreshCw,
  Newspaper,
  Lock,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  subItems?: SubItem[];
}

export interface SubItem {
  name: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  description?: string;
  category?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: "Norbi",
    href: "/szia-norbi-vagyok",
  },
  {
    name: "AI Megoldások",
    href: "/ai-megoldasok",
    subItems: [
      {
        name: "AI Workflow Kialakítás",
        href: "/szolgaltatasok/ai-workflow-kialakitas",
        icon: Bot,
        description: "Automatizált munkafolyamatok és AI integrációk",
        category: "Automatizáció",
      },
      {
        name: "AI Kép és Videó Generálás",
        href: "/szolgaltatasok/ai-kep-es-videogeneralas",
        icon: ImageIcon,
        description: "AI-vezérelt képek és videók készítése",
        category: "Generatív",
      },
      {
        name: "AI Prompt Engineering",
        href: "/szolgaltatasok/ai-prompt-engineering",
        icon: Sparkles,
        description: "Professzionális prompt tervezés és optimalizálás",
        category: "Engineering",
      },
      {
        name: "AI Sablonok",
        href: "/portal/prompt-sablonok",
        icon: Copy,
        description: "Professzionális AI prompt sablonok gyűjteménye",
        category: "Sablonok",
      },
    ],
  },
  {
    name: "Szolgáltatások",
    href: "/szolgaltatasok",
    subItems: [
      {
        name: "Weboldal Készítés",
        href: "/szolgaltatasok/weboldal-keszites",
        icon: Globe,
        description: "Next.js alapú ultragyors weboldalak",
        category: "Web",
      },
      {
        name: "WordPress Webshop",
        href: "/szolgaltatasok/woocommerce-webshop-keszites",
        icon: ShoppingBag,
        description: "WooCommerce alapú e-kereskedelmi megoldások",
        category: "Webshop",
      },
      {
        name: "Webshop Fejlesztés",
        href: "/szolgaltatasok/webshop-fejlesztes",
        icon: ShoppingBag,
        description: "Skálázható e-kereskedelmi rendszerek",
        category: "Webshop",
      },
      {
        name: "WordPress Fejlesztés",
        href: "/szolgaltatasok/wordpress-fejlesztes",
        icon: MapPin,
        description: "Professzionális WordPress fejlesztés",
        category: "Helyi",
      },
      {
        name: "SEO Optimalizálás",
        href: "/szolgaltatasok/seo-optimalizalas",
        icon: Search,
        description: "Technikai SEO és Google rangsorolás",
        category: "Marketing",
      },
      {
        name: "Marketing Lead Generálás",
        href: "/szolgaltatasok/marketing-lead-generalas",
        icon: TrendingUp,
        description: "AI-vezérelt lead generálás és konverzió",
        category: "Marketing",
      },
      {
        name: "Grafikai Tervezés",
        href: "/szolgaltatasok/grafikai-tervezes",
        icon: Palette,
        description: "Professzionális arculattervezés és branding",
        category: "Design",
      },
      {
        name: "Egyedi Fejlesztés",
        href: "/szolgaltatasok/egyedi-arculattervezes-logo",
        icon: Layout,
        description: "Teljes körű vizuális identitás tervezés",
        category: "Design",
      },
      {
        name: "WordPress Karbantartás",
        href: "/szolgaltatasok/wordpress-karbantartas",
        icon: Wrench,
        description: "Hibajavítás, védelem és folyamatos felügyelet",
        category: "Karbantartás",
      },
      {
        name: "Weboldal Gyorsítás",
        href: "/szolgaltatasok/weboldal-sebessegoptimalizalas",
        icon: Zap,
        description: "Core Web Vitals és PageSpeed optimalizálás",
        category: "Teljesítmény",
      },
      {
        name: "Technikai SEO Audit",
        href: "/szolgaltatasok/technikai-seo-audit",
        icon: Search,
        description: "Indexelési hibák és rejtett akadályok feltárása",
        category: "Marketing",
      },
      {
        name: "WordPress Biztonság",
        href: "/szolgaltatasok/wordpress-biztonsag",
        icon: ShieldAlert,
        description: "Azonnali vírusirtás és sebezhetőség-zárás",
        category: "Biztonság",
      },
      {
        name: "Weboldal Felújítás",
        href: "/szolgaltatasok/weboldal-felujitas",
        icon: RefreshCw,
        description: "Elavult honlapok modernizálása és konverziója",
        category: "Web",
      },
      {
        name: "Helyi SEO (Local SEO)",
        href: "/szolgaltatasok/helyi-seo",
        icon: MapPin,
        description: "Google Térkép optimalizálás és helyi dominancia",
        category: "Marketing",
      },
      {
        name: "Prémium AI & Automatizációs Megoldások",
        href: "/termekek",
        icon: Sparkles,
        description: "AI workflow, prompt engineering és automatizáció",
        category: "AI",
      },
    ],
  },
  {
    name: "Termékek",
    href: "/termekek",
  },
  { name: "Munkáim", href: "/munkak" },
  { name: "Hírek", href: "/hirek" },
  { name: "Ügyfélportál", href: "/portal" },
];

/**
 * **Top Bar elemek** — a Header legfelső, vékony sávja.
 *
 * A „Hírek" és az „Ügyfélportál" kiemelése a fő navigációból
 * ide: kisebb betűmérettel (`text-xs`), diszkrét `lucide-react`
 * ikonokkal jelenik meg, így nem vonják el a figyelmet a fő
 * CTA-król, de minden útvonal elérhető marad egyetlen kattintással.
 *
 * **A z-index:** a sáv a fejléc *része* (`bg-bg-base/80`
 * üveghatás), nem külön réteg — ezért nincs saját z-indexe,
 * így sosem takarhatja el a cookie bannert vagy a modálokat.
 */
export interface TopBarItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

/** A top bar magyar tartalma. */
export const TOP_BAR_ITEMS_HU: TopBarItem[] = [
  { name: "Hírek", href: "/hirek", icon: Newspaper },
  { name: "Ügyfélportál", href: "/portal", icon: Lock },
];

/** A top bar angol tartalma. */
export const TOP_BAR_ITEMS_EN: TopBarItem[] = [
  { name: "Blog", href: "/hirek", icon: Newspaper },
  { name: "Client Portal", href: "/portal", icon: Lock },
];

/**
 * A top bar elemei a megfelelő nyelven.
 *
 * **A fő menü és a top bar szétválasztása itt történik:** a
 * `NAV_ITEMS` (és az EN variánsa) változatlan marad a
 * szolgáltatás/dropdown struktúra miatt, de a `HeaderNavClient`
 * a `TOP_BAR_ITEM_NAMES` alapján kiszűri a „Hírek" és az
 * „Ügyfélportál" pontot a fő menüből, hogy ne jelenjenek meg
 * kétszer.
 */
export function getTopBarItems(lang: Language): TopBarItem[] {
  return lang === "en" ? TOP_BAR_ITEMS_EN : TOP_BAR_ITEMS_HU;
}

/**
 * Azok a menünevek, amelyek a top barban jelennek meg, és
 * **nem** duplikálódnak a fő navigációban.
 */
export const TOP_BAR_ITEM_NAMES = ["Hírek", "Ügyfélportál"];

/**
 * Nyelvfüggő navigáció — a HeaderNavClient innen kéri le a menüt.
 * HU: teljes dropdown menü (NAV_ITEMS), EN: anchor-alapú főoldali menü.
 */
export function getNavItems(lang: Language): NavItem[] {
  return lang === "en" ? NAV_ITEMS_EN : NAV_ITEMS;
}

/**
 * A **fő** navigáció a top bar elemei nélkül.
 *
 * Ez az, amit a fejléc vízszintes sávja renderel — így a
 * „Hírek" és az „Ügyfélportál" csak egyszer jelenik meg,
 * a felső sávon.
 */
export function getMainNavItems(lang: Language): NavItem[] {
  return getNavItems(lang).filter(
    (item) => !TOP_BAR_ITEM_NAMES.includes(item.name)
  );
}
