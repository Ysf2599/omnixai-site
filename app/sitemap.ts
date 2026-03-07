import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://omnixai.co.uk",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}