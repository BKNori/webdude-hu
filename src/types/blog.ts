export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  noindex?: boolean;
  content?: string;
  category?: string;
  readingTime?: string;
  coverImage?: string;
  featured?: boolean;
}

/** Firestore `blog_posts` kollekció dokumentum típusa. */
export interface FirestoreBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  date: string;
  updatedAt: string;
  author: string;
  readingTime: string;
  featured: boolean;
  noindex: boolean;
  published: boolean;
}

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  noindex?: boolean;
}
