export interface Work {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "weboldal" | "webshop" | "arculat" | "grafika" | "branding";
  tags: string[];
  image?: string;
  bannerImage?: string;
  gallery?: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  featured?: boolean;
  year?: number;
  client?: string;
  website?: string;
}
