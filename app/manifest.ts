import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "APEX Store | Precision Engineering & Peripherals",
    short_name: "APEX Store",
    description: "Industrial-grade audio, CNC mechanical keyboards, titanium timepieces, and technical wear with instant encrypted checkout.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
