import { PUBLIC_WEBSITE_HOST } from '$env/static/public';
import { posts } from '$lib/server/posts';

// Thank you Casper Feng!
// https://www.casperfeng.com/blog/generating-dynamic-sitemaps-in-sveltekit

const pages = ['about', 'blog', 'board'];

export async function GET() {
	const body = sitemap(pages);
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');
	return response;
}

const sitemap = (pages: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${PUBLIC_WEBSITE_HOST}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  ${pages
		.map(
			(page) => `
      <url>
        <loc>${PUBLIC_WEBSITE_HOST}/${page}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
      </url>
  `
		)
		.join('')}
  ${posts
		.map(
			(post) => `
      <url>
        <loc>${PUBLIC_WEBSITE_HOST}/blog/${post.slug}</loc>
        <changefreq>monthly</changefreq>
        <lastmod>${post.updatedAt ? post.updatedAt.toISOString() : post.createdAt.toISOString()}</lastmod>
        <priority>0.5</priority>
      </url>
  `
		)
		.join('')}
</urlset>`;
