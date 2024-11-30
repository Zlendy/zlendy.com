<script lang="ts">
	import type { PageServerData } from './$types';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import LinkArrow from '$lib/components/link-arrow.svelte';

	export let data: PageServerData;

	dayjs.extend(relativeTime);

	const now = dayjs();
</script>

<header class="flex min-h-48 flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-5xl font-bold leading-tight">Blog</h1>
</header>

<div class="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-4 px-4">
	{#each data.posts as post}
		<article class="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
			<div class="flex flex-col space-y-1.5 p-6">
				<h3 class="text-lg font-semibold leading-none tracking-tight">
					<LinkArrow href="/blog/{post.slug}">
						{post.title}
					</LinkArrow>
				</h3>
				<p class="text-sm text-muted-foreground">
					<Tooltip.Root>
						{@const date = dayjs(post.createdAt)}

						<Tooltip.Trigger>
							{now.diff(date, 'days', true) < 7 // Posted in the last week
								? date.from(now) // Show relative time
								: date.format('DD/MMM/YYYY [at] HH:mm')}
						</Tooltip.Trigger>
						<Tooltip.Content>
							{date.format('dddd, MMMM DD, YYYY [at] HH:mm')}
						</Tooltip.Content>
					</Tooltip.Root>
				</p>
			</div>
			<div class="whitespace-pre-wrap p-6 pt-0">{post.description}</div>
		</article>
	{/each}
</div>
