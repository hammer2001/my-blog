// src/pages/search.json.js
import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  const data = posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map(post => ({
      title: post.data.title,
      summary: post.data.summary || '',
      url: `/posts/${post.id}/`,
      date: post.data.date.toISOString(),
      categories: post.data.categories,
      tags: post.data.tags,
    }));

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
