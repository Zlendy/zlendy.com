<script lang="ts">
	import Comments from '$lib/components/fediverse/comments.svelte';
	import Post from '$lib/components/fediverse/post.svelte';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import Toc from 'svelte-toc';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { TableOfContents } from '@lucide/svelte';
	import { onDestroy, onMount } from 'svelte';
	import Datetooltip from '$lib/components/datetooltip.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import { PAGE_TRANSITION_MS } from '../../+layout.svelte';
	import { fade } from 'svelte/transition';
	import mediumZoom from 'medium-zoom';
	import { blogMetadataStore, type BlogMetadata } from '$lib/components/metadata/store';
	import Metadata from '$lib/components/metadata/metadata.svelte';
	import { trackEvent } from '@lukulent/svelte-umami';
	import { browser } from '$app/environment';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { title, description, fediverse, createdAt, updatedAt, slug } = data.post;

	const now = dayjs();
	let windowScrollY: number = $state(0);

	let articleElement: HTMLElement = $state()!;
	let tocPinned = $derived(windowScrollY > 64);

	const tocHeadingSelector = 'article :is(h1, h2, h3, h4, h5, h6):not(.toc-exclude)';
	let tocEnabled = $state(false);

	let contentElement: HTMLElement = $state()!;
	let contentOffsetTop = $state(0);
	let contentOffsetHeight = $state(0);
	let progressValue = $derived(windowScrollY - contentOffsetTop);
	let tocOpen = $state(false);

	let metadata = $derived<BlogMetadata | undefined>(blogMetadataStore.articles.get(slug));

	let readingIntervalId = $state<number>();

	onMount(async () => {
		tocEnabled = articleElement.querySelector(tocHeadingSelector) !== null;

		setTimeout(() => {
			contentOffsetTop = contentElement.offsetTop;
			contentOffsetHeight = contentElement.offsetHeight;
		}, PAGE_TRANSITION_MS * 2); // Wait until the page transition is completed to store this value

		readingIntervalId = window.setInterval(() => {
			trackEvent('reading-blog', {
				slug
			});
		}, 1000 * 60);

		mediumZoom('[data-zoomable]', {
			background: 'transparent',
			margin: 16
		});

		await blogMetadataStore.getOne(slug);
	});

	onDestroy(() => {
		if (browser) window.clearInterval(readingIntervalId);
	});
</script>

<svelte:head>
	<title>{title} - Zlendy</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>

<svelte:window bind:scrollY={windowScrollY} />

<Sheet.Root bind:open={tocOpen}>
	<Button
		variant="outline"
		size={tocPinned ? 'icon' : undefined}
		class="invisible sticky top-4 left-full z-50 mt-4 mr-4 shrink-0 transition-all
		{tocEnabled && 'visible'}"
		onclick={() => (tocOpen = !tocOpen)}
	>
		<TableOfContents class="h-5 w-5" />
		<span class="sr-only">Table of Contents</span>
		<span class="not-sr-only {tocPinned ? 'hidden' : undefined}">Table of Contents</span>
	</Button>
	<Sheet.Content side="right" class="toc-sheet p-6" preventScroll={false}>
		{#snippet overlay()}
			<Sheet.Overlay class="bg-transparent backdrop-blur-none" />
		{/snippet}
		<Toc
			autoHide={false}
			breakpoint={0}
			headingSelector={tocHeadingSelector}
			--toc-title-margin="0 0 2rem 0"
			--toc-active-font-weight="bold"
			--toc-active-color="var(--primary-foreground)"
			--toc-active-bg="var(--primary)"
			--toc-li-hover-color="var(--secondary-foreground)"
			--toc-li-hover-bg="var(--secondary)"
			--toc-max-height="90dvh"
			--toc-font="0.6em sans-serif"
		>
			{#snippet title_snippet()}
				<h1 class="text-xl font-medium">Table of Contents</h1>
			{/snippet}
		</Toc>
	</Sheet.Content>
</Sheet.Root>

{#if 0 < progressValue && progressValue < contentOffsetHeight}
	<div class="z-100" transition:fade={{ duration: 500 }}>
		<Progress
			value={progressValue}
			max={contentOffsetHeight}
			class="fixed top-0 left-0 h-1"
		/>
	</div>
{/if}

<article
	bind:this={articleElement}
	class="bg-background/40 dark:bg-background/80 mx-2 my-4 w-[calc(100%-1rem)] max-w-3xl rounded-xl border-2 px-4 pb-4 backdrop-blur-md"
>
	<header class="flex min-h-48 flex-col items-center justify-center text-center">
		<h1 class="toc-exclude my-4 text-5xl leading-tight font-bold">{title}</h1>
		<h2 class="toc-exclude">
			<Datetooltip prefix="Created" {now} date={dayjs(createdAt)} />
		</h2>
		{#if updatedAt}
			<h2 class="toc-exclude">
				<Datetooltip prefix="Updated" {now} date={dayjs(updatedAt)} />
			</h2>
		{/if}
	</header>

	<div class="flex min-h-12 justify-center gap-4 p-4 pb-0">
		{#if metadata}
			<Metadata {metadata} />
		{/if}
	</div>

	<div bind:this={contentElement}>
		<!-- render the post -->
		<data.component />
	</div>
</article>

{#if fediverse}
	<section id="fediverse" class="toc-exclude w-full max-w-3xl px-4">
		<Post noteId={fediverse} />
		<Comments noteId={fediverse} />
	</section>
{/if}
