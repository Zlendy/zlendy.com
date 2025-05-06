import { posts } from '$lib/server/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		post: posts.at(0) // latest blog post
	};
};
