import { ComponentType } from "react";
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
