export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  noindex?: boolean;
  image: string;
  isMdx: boolean;
}

export const posts: PostMeta[] = [
  {
    title: "Wordpress oldalak feltörésének lehetséges módja",
    slug: "wordpress-oldalak-feltoresenek-lehetseges-modja",
    date: "Mon, 01 May 2023 11:50:51 +0000",
    excerpt:
      "WordPress oldalak feltörésének lehetséges módjai és biztonsági rései - részletes technikai útmutató.",
    noindex: true,
    image: "/assets/banners/webdude-hero.webp",
    isMdx: true,
  },
  {
    title: "WordPress karbantartás 13+ kötelező feladat 2023-ban",
    slug: "wordpress-karbantartas-webhely-karbantartas-13-kotelezo-feladat-2023-ban",
    date: "Mon, 01 May 2023 18:06:31 +0000",
    excerpt:
      "WordPress webhely karbantartás: 13+ kötelező feladat 2023-ban a biztonság és teljesítmény érdekében.",
    image: "/assets/banners/webdude-hero.webp",
    isMdx: true,
  },
];
