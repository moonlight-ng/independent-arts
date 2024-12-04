import { defineCollection, z } from "astro:content";

const newsCollection = defineCollection({
  type: "content",
  schema: ({image}) => z.object({
    title: z.string(),
    url: z.string(),
    author: z.string(),
    date: z.string(),
    imageUrl: image(),
    seoImageUrl: image().optional(),
    external: z.boolean(),
    originalHost: z.string().optional(),
    description: z.string().optional(),
  })
});

export const collections = {
  news: newsCollection,
};