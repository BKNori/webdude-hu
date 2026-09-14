import { ImageResponse } from "next/og";
import { posts as fallbackPosts } from "@/data/posts";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = "WebDude Blog";
  let excerpt = "Fejlesztés, grafika és AI-asszisztens platform";
  let dateVal = new Date();

  try {
    const postsDirectory = path.join(process.cwd(), "src", "content", "blog");
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContents);
      title = data.title || title;
      excerpt = data.excerpt || excerpt;
      if (data.date) {
        dateVal = new Date(data.date);
      }
    } else {
      const post = fallbackPosts.find((p) => p.slug === slug);
      if (post) {
        title = post.title;
        excerpt = post.excerpt;
        dateVal = new Date(post.date);
      }
    }
  } catch {
    const post = fallbackPosts.find((p) => p.slug === slug);
    if (post) {
      title = post.title;
      excerpt = post.excerpt;
      dateVal = new Date(post.date);
    }
  }

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#020617",
        backgroundImage:
          "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Brand mark */}
      <div
        style={{
          position: "absolute",
          top: "48px",
          left: "48px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#00B5F1",
            borderRadius: "8px",
          }}
        />
        <span
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#e2e8f0",
          }}
        >
          WebDude
        </span>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          color: "#e2e8f0",
          textAlign: "center",
          maxWidth: "1000px",
          lineHeight: 1.1,
          marginBottom: "24px",
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "28px",
          color: "#94a3b8",
          textAlign: "center",
          maxWidth: "800px",
          marginBottom: "48px",
        }}
      >
        {excerpt}
      </p>

      {/* Footer badges */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "#00B5F1",
            color: "#020617",
            borderRadius: "9999px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Blog
        </div>
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "#00B5F1",
            color: "#020617",
            borderRadius: "9999px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {dateVal.toLocaleDateString("hu-HU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>,
    size
  );
}
