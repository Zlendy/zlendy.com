import { PUBLIC_WEBSITE_HOST } from '$env/static/public';
import { posts } from '$lib/server/posts';
import dayjs from 'dayjs';

export const prerender = true;

export async function GET() {
	const body = rss();
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');
	return response;
}

const rss = () =>
	`<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Zlendy</title>
      <description>Hi there! Welcome to my little slice of the internet. I'm a web developer from Spain who loves contributing to FOSS projects.</description>
      <link>${PUBLIC_WEBSITE_HOST}</link>
      ${posts
				.map(
					(post) =>
						`<item>
              <title>${post.title}</title>
              <link>${PUBLIC_WEBSITE_HOST}/blog/${post.slug}</link>
              <guid isPermaLink="true">${PUBLIC_WEBSITE_HOST}/blog/${post.slug}</guid>
              <description>${post.description}</description>
              <pubDate>${dayjs(post.createdAt).format('ddd, DD MMM YYYY HH:mm:ss ZZ')}</pubDate>
            </item>`
				)
				.join('')}
    </channel>
  </rss>`;
