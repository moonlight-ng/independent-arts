import { defineCollection } from 'astro:content';
import { newsPostSchema, type MarblePostResponse } from './schemas/news';

const key = import.meta.env.MARBLE_WORKSPACE_KEY;
const url = import.meta.env.MARBLE_API_URL;

const newsCollection = defineCollection({
  loader: async () => {
    const response = await fetch(`${url}/${key}/posts`);
    const rawData: MarblePostResponse = await response.json();
    const newsPosts = rawData.posts.map((post) => newsPostSchema.parse(post));

    // https://docs.astro.build/en/reference/content-loader-reference/#loader-types
    return newsPosts.map((post) => ({
      ...post,
    }));
  },
  schema: newsPostSchema,
});

export const collections = {
  news: newsCollection,
};
