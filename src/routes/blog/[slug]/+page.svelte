<script lang="ts">
	import Comments from '$lib/components/fediverse/comments.svelte';
	import Post from '$lib/components/fediverse/post.svelte';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import Toc from 'svelte-toc';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { TableOfContents } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Datetooltip from '$lib/components/datetooltip.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import { PAGE_TRANSITION_MS } from '../../+layout.svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { title, description, fediverse, createdAt, updatedAt } = data.post;

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

	onMount(() => {
		tocEnabled = articleElement.querySelector(tocHeadingSelector) !== null;

		setTimeout(() => {
			contentOffsetTop = contentElement.offsetTop;
			contentOffsetHeight = contentElement.offsetHeight;
		}, PAGE_TRANSITION_MS * 2); // Wait until the page transition is completed to store this value
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
		class="invisible sticky left-full top-4 z-50 mr-4 mt-4 shrink-0 transition-all
		{tocEnabled && 'visible'}"
		onclick={() => (tocOpen = !tocOpen)}
	>
		<TableOfContents class="h-5 w-5" />
		<span class="sr-only">Table of Contents</span>
		<span class="not-sr-only {tocPinned ? 'hidden' : undefined}">Table of Contents</span>
	</Button>
	<Sheet.Content side="right" class="toc-sheet" preventScroll={false}>
		{#snippet overlay()}
			<Sheet.Overlay class="bg-transparent backdrop-blur-none" />
		{/snippet}
		<Toc
			autoHide={false}
			title="Table of Contents"
			breakpoint={0}
			headingSelector={tocHeadingSelector}
			--toc-title-margin="0 0 2rem 0"
			--toc-active-font-weight="bold"
			--toc-active-bg="none"
			--toc-active-color="hsl(var(--foreground)"
			--toc-li-hover-color="none"
			--toc-max-height="90dvh"
		/>
	</Sheet.Content>
</Sheet.Root>

{#if 0 < progressValue && progressValue < contentOffsetHeight}
	<div transition:fade={{ duration: 500 }}>
		<Progress value={progressValue} max={contentOffsetHeight} class="fixed top-0 z-[100] h-1" />
	</div>
{/if}

<article bind:this={articleElement} class="mx-auto mb-4 max-w-2xl px-4">
	<header class="flex min-h-48 flex-col items-center justify-center text-center">
		<h1 class="toc-exclude mb-4 text-5xl font-bold leading-tight">{title}</h1>
		<h2 class="toc-exclude">
			<Datetooltip prefix="Created" {now} date={dayjs(createdAt)} />
		</h2>
		{#if updatedAt}
			<h2 class="toc-exclude">
				<Datetooltip prefix="Updated" {now} date={dayjs(updatedAt)} />
			</h2>
		{/if}
	</header>

	<div bind:this={contentElement}>
		<!-- render the post -->
		<data.component />
	</div>
</article>

{#if fediverse}
	<section id="fediverse" class="toc-exclude mx-auto max-w-2xl px-4">
		<Post noteId={fediverse} />
		<Comments noteId={fediverse} />
	</section>
{/if}
