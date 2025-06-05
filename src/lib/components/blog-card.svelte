<script lang="ts">
	import Datetooltip from '../../lib/components/datetooltip.svelte';
	import dayjs from 'dayjs';
	import { blogMetadataStore } from '$lib/components/metadata/store';
	import Metadata from '$lib/components/metadata/metadata.svelte';
	import type { Post } from '$lib/server/posts';

	interface Props {
		post: Post;
		now: dayjs.Dayjs;
	}

	let { post, now }: Props = $props();

	const metadata = $derived(blogMetadataStore.articles.get(post.slug));
</script>

<article class="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
	<a href="/blog/{post.slug}">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-lg font-semibold leading-none tracking-tight">
				{post.title}
			</h3>
			<div class="mt-1">
				<p class="mt-0! text-sm text-muted-foreground">
					<Datetooltip prefix="Created" {now} date={dayjs(post.createdAt)} />
				</p>
				{#if post.updatedAt}
					<p class="mt-0! text-sm text-muted-foreground">
						<Datetooltip prefix="Updated" {now} date={dayjs(post.updatedAt)} />
					</p>
				{/if}
			</div>
		</div>
		<div class="whitespace-pre-wrap p-6 pt-0">{post.description}</div>
		<div class="flex h-12 gap-4 p-6 pt-0">
			{#if metadata}
				<Metadata {metadata} />
			{/if}
		</div>
	</a>
</article>
