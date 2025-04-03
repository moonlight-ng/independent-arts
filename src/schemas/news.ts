import { z } from 'astro:content';

export const newsPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  description: z.string(),
  coverImage: z.string().url(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  authors: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      image: z.string().url(),
    })
  ),
  category: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    })
  ),
  attribution: z
    .object({
      author: z.string(),
      url: z.string().url(),
    })
    .nullable(),
});
export type NewsPost = z.infer<typeof newsPostSchema>;


export const paginationSchema = z.object({
  limit: z.number(),
  currPage: z.number(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
  totalPages: z.number(),
  totalItems: z.number(),
});
export type Pagination = z.infer<typeof paginationSchema>;

export const MarblePostResponseSchema = z.object({
  posts: z.array(newsPostSchema),
  pagination: paginationSchema,
});
export type MarblePostResponse = z.infer<typeof MarblePostResponseSchema>;


