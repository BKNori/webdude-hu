import { ImageResponse } from "next/og";

// export const runtime = 'edge'; // disabled for standalone build
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
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
            backgroundColor: "#f59e0b",
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
          marginBottom: "24px",
        }}
      >
        AI Prompt Engineering
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
        Profi prompt tervezés és AI modellek optimalizálása maximális
        eredményért
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
            backgroundColor: "#f59e0b",
            color: "bg-transparent",
            borderRadius: "9999px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Szolgáltatás
        </div>
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "#f59e0b",
            color: "bg-transparent",
            borderRadius: "9999px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          AI
        </div>
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: "#f59e0b",
            color: "bg-transparent",
            borderRadius: "9999px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Prompt
        </div>
      </div>
    </div>,
    size
  );
}
