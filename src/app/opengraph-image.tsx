import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #0b1220 0%, #111827 40%, #1d4ed8 120%)",
          color: "white",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            RecallDev
          </div>
          <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.05 }}>
            Intelligent Interview Mastery
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.9)",
              maxWidth: 980,
            }}
          >
            Active recall + spaced repetition for JavaScript, TypeScript, Go,
            Python, and System Architecture.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <div>recalldev.mandy9943.dev</div>
          <div style={{ fontWeight: 700 }}>Built by Mandy9943</div>
        </div>
      </div>
    ),
    size
  );
}




