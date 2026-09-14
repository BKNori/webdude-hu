import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "src", "content", "blog");

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      image: data.image as string | undefined,
      noindex: data.noindex as boolean | undefined,
    };
  });

  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      image: data.image as string | undefined,
      noindex: data.noindex as boolean | undefined,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));
}
