export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  noindex?: boolean;
  content?: string;
}

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  noindex?: boolean;
}
