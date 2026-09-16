import { ImageResponse } from "next/og";

export interface OGTemplateProps {
  title: string;
  subtitle?: string;
  tags?: string[];
}

export function generateOGImage(props: OGTemplateProps) {
  const { title, subtitle, tags = [] } = props;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "bg-transparent",
        backgroundImage:
          "linear-gradient(135deg, bg-transparent 0%, #0f172a 50%, #1e293b 100%)",
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
          fontSize: "72px",
          fontWeight: "bold",
          color: "#e2e8f0",
          textAlign: "center",
          maxWidth: "1000px",
          lineHeight: 1.1,
          marginBottom: subtitle ? "24px" : "0",
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "800px",
            marginBottom: "48px",
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Footer badges */}
      {tags.length > 0 && (
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
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                backgroundColor: "#00B5F1",
                color: "bg-transparent",
                borderRadius: "9999px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
