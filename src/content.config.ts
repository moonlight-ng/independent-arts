import { defineCollection } from "astro:content";
import { newsSchema } from "./schemas/news";
import { Marble } from "@usemarble/sdk";
const key = import.meta.env.MARBLE_API_KEY;

if (!key) {
  throw new Error("Missing MARBLE_API_KEY in environment variables");
}

const marble = new Marble({
  apiKey: key,
});

const newsCollection = defineCollection({
  loader: async () => {
    const { result } = await marble.posts.list();

    // https://docs.astro.build/en/reference/content-loader-reference/#loader-types
    return result.posts.map((post) => ({
      ...post,
    }));
  },
  schema: newsSchema,
});

export const collections = { news: newsCollection };
