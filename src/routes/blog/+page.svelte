<script lang="ts">
	import type { PageServerData } from './$types';
	import LinkArrow from '$lib/components/link-arrow.svelte';
	import Datetooltip from '../../lib/components/datetooltip.svelte';
	import dayjs from 'dayjs';

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();

	const now = dayjs();
</script>

<svelte:head>
	<title>Blog - Zlendy</title>
</svelte:head>

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
				<div class="mt-1">
					<p class="!mt-0 text-sm text-muted-foreground">
						<Datetooltip prefix="Created" {now} date={dayjs(post.createdAt)} />
					</p>
					{#if post.updatedAt}
						<p class="!mt-0 text-sm text-muted-foreground">
							<Datetooltip prefix="Updated" {now} date={dayjs(post.updatedAt)} />
						</p>
					{/if}
				</div>
			</div>
			<div class="whitespace-pre-wrap p-6 pt-0">{post.description}</div>
		</article>
	{/each}
</div>
