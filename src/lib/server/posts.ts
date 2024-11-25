import { parse } from 'path';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

for (const plugin of [customParseFormat, utc]) dayjs.extend(plugin);

type RawPost = {
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string | null;
	slug: string;
	fediverse?: string;
};

export type Post = Override<
	RawPost,
	{
		createdAt: Date;
		updatedAt: Date | null;
	}
>;

type GlobEntry = {
	metadata: RawPost;
	default: unknown;
};

// Get all posts and add metadata
export const posts = Object.entries(
	import.meta.glob<GlobEntry>('/src/posts/**/*.md', { eager: true })
)
	.map(([filepath, globEntry]): Post => {
		return {
			...globEntry.metadata,
			createdAt: dayjs(globEntry.metadata.createdAt, ['YYYY-MM-DD HH:mm [UTC]']).utc(true).toDate(),
			updatedAt: globEntry.metadata.updatedAt
				? dayjs(globEntry.metadata.updatedAt, ['YYYY-MM-DD HH:mm [UTC]']).utc(true).toDate()
				: null,
			slug: parse(filepath).name // generate the slug from the file path
		};
	})
	// sort by date
	.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
	// add references to the next/previous post
	.map((post, index, allPosts) => ({
		...post,
		next: allPosts[index - 1] || 0,
		previous: allPosts[index + 1] || 0
	}));
