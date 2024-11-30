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

	export let data: PageData;
	const { title, description, fediverse } = data.post;

	let articleElement: HTMLElement;

	let windowScrollY: number = 0;
	$: tocPinned = windowScrollY !== 0;

	const tocHeadingSelector = 'article :is(h1, h2, h3, h4, h5, h6):not(.toc-exclude)';
	let tocEnabled = false;

	onMount(() => {
		tocEnabled = articleElement.querySelector(tocHeadingSelector) !== null;
	});
</script>

<svelte:head>
	<title>{title} - Zlendy</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>

<svelte:window on:scroll={() => (windowScrollY = window.scrollY)} />

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			size={tocPinned ? 'icon' : undefined}
			class="invisible sticky left-full top-4 z-50 mr-4 mt-4 shrink-0 transition-all {tocEnabled &&
				'visible'}"
		>
			<TableOfContents class="h-5 w-5" />
			<span class="sr-only">Table of Contents</span>
			<span class="not-sr-only {tocPinned ? 'size-0 text-transparent' : undefined}">
				&nbspTable of Contents
			</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="right" class="toc-sheet">
		<Toc
			autoHide={false}
			title="Table of Contents"
			breakpoint={0}
			headingSelector={tocHeadingSelector}
			--toc-title-margin="0 0 2rem 0"
			--toc-active-font-weight="bold"
			--toc-active-bg="none"
			--toc-li-hover-color="none"
		/>
	</Sheet.Content>
</Sheet.Root>

<article bind:this={articleElement} class="mx-auto mb-4 max-w-2xl px-4">
	<header class="flex min-h-48 flex-col items-center justify-center text-center">
		<h1 class="toc-exclude mb-4 text-5xl font-bold leading-tight">{title}</h1>
		<h2 class="toc-exclude">{dayjs(data.post.createdAt).format('DD/MMM/YYYY [at] HH:mm')}</h2>
	</header>

	<!-- render the post -->
	<svelte:component this={data.component} />
</article>

{#if fediverse}
	<section id="fediverse" class="toc-exclude mx-auto max-w-2xl px-4">
		<Post noteId={fediverse} />
		<Comments noteId={fediverse} />
	</section>
{/if}
