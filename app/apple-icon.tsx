import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: 40,
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.5)",
        }}
      >
        AP
      </div>
    ),
    {
      ...size,
    }
  );
}
