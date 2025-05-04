import { PUBLIC_API_URL } from '$env/static/public';
import { SvelteMap } from 'svelte/reactivity';

export interface BlogMetadata {
	views: number;
	comments: number;
	reactions: number;
}

class BlogMetadataStore {
	#articles = new SvelteMap<string, BlogMetadata>();

	async getOne(slug: string): Promise<BlogMetadata | undefined> {
		try {
			const foundMetadata = this.#articles.get(slug);
			if (foundMetadata) return foundMetadata;

			const response = await fetch(`${PUBLIC_API_URL}/blog/metadata/${slug}`);
			if (response.status !== 200) return;

			const json: BlogMetadata = await response.json();

			this.#articles.set(slug, json);
			return json;
		} catch (e) {
			console.error(e);
		}
	}

	async getAll(): Promise<Record<string, BlogMetadata> | undefined> {
		try {
			const response = await fetch(`${PUBLIC_API_URL}/blog/metadata`);
			if (response.status !== 200) return;

			const json: Record<string, BlogMetadata> = await response.json();

			for (const [key, value] of Object.entries(json)) this.#articles.set(key, value);
			return json;
		} catch (e) {
			console.error(e);
		}
	}

	get articles() {
		return this.#articles;
	}
}

export const blogMetadataStore = new BlogMetadataStore();
