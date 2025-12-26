import { defineCollection } from "astro:content";
import { newsPostSchema, type NewsPost } from "./schemas/news";

const key = import.meta.env.MARBLE_API_KEY;
const url = import.meta.env.MARBLE_API_URL;

if (!url || !key) {
  throw new Error(
    "Missing MARBLE_API_URL or MARBLE_API_KEY in environment variables"
  );
}

async function fetchNews(queryParams = ""): Promise<NewsPost[]> {
  const fullUrl = `${url}/posts${queryParams}`;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch posts from ${fullUrl}:`, {
        status: response.status,
        statusText: response.statusText,
        url: fullUrl,
      });
      return [];
    }

    const data = await response.json();
    return data.posts as NewsPost[];
  } catch (error) {
    console.error(`Error fetching posts from ${fullUrl}:`, error);
    return [];
  }
}

const newsCollection = defineCollection({
  loader: async () => {
    const newsPosts = await fetchNews();

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
