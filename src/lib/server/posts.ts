import { parse } from 'path';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

type RawPost = {
	title: string;
	description: string;
	date: string;
	slug: string;
	fediverse?: string;
};

export type Post = Override<
	RawPost,
	{
		date: Date;
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
			date: dayjs(globEntry.metadata.date, ['YYYY-MM-DD HH-mm', 'YYYY-MM-DD']).toDate(),
			slug: parse(filepath).name // generate the slug from the file path
		};
	})
	// sort by date
	.sort((a, b) => b.date.getTime() - a.date.getTime())
	// add references to the next/previous post
	.map((post, index, allPosts) => ({
		...post,
		next: allPosts[index - 1] || 0,
		previous: allPosts[index + 1] || 0
	}));
