import { posts } from '$lib/server/posts';
import { json } from '@sveltejs/kit';

export const prerender = true;

/**
 * Links a blog post slug to a fediverse ID
 */
export function GET() {
	const map = new Map<string, string | null>();

	for (const post of posts) {
		map.set(post.slug, post.fediverse ?? null);
	}

	return json(Object.fromEntries(map));
}
