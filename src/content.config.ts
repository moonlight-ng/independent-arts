import { defineCollection } from "astro:content";
import { newsSchema } from "./schemas/news";
import { Marble } from "@usemarble/sdk";

const newsCollection = defineCollection({
  loader: async () => {
    const key = import.meta.env.MARBLE_API_KEY;
    if (!key) {
      return [];
    }

    try {
      const marble = new Marble({ apiKey: key });
      const { result } = await marble.posts.list();

      // https://docs.astro.build/en/reference/content-loader-reference/#loader-types
      return result.posts.map((post) => ({
        ...post,
      }));
    } catch (err) {
      console.error(
        "[content/news] Marble posts.list() failed; building with no news entries.",
        err
      );
      return [];
    }
  },
  schema: newsSchema,
});

export const collections = { news: newsCollection };
