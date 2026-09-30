import type { NavItem } from "./navigation";

/**
 * EN főoldali navigáció — anchor-alapú menü.
 *
 * Az `/en` alatt csak a főoldal él angolul, ezért minden menüpont a `/en`
 * oldal szekcióira hivatkozik (nincs dropdown / subItem).
 * A szekció-ID-k egyeznek a komponensekkel: #about (WhyChooseMeSection),
 * #services (FeaturedServicesNew), #cases (CaseStudiesBento),
 * #faq (FaqSectionAEO), #contact (FinalCta).
 */
export const NAV_ITEMS_EN: NavItem[] = [
  { name: "About", href: "/en#about" },
  { name: "Services", href: "/en#services" },
  { name: "Portfolio", href: "/en#cases" },
  { name: "FAQ", href: "/en#faq" },
];
