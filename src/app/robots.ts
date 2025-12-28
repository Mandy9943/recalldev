import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://recalldev.mandy9943.dev/sitemap.xml",
    host: "https://recalldev.mandy9943.dev",
  };
}
