export interface Work {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  bannerImage?: string;
  gallery?: string[];
  year?: number;
  client?: string;
  website?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
}
