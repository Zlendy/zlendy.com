<script lang="ts">
	import Comments from '$lib/components/fediverse/comments.svelte';
	import Post from '$lib/components/fediverse/post.svelte';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';

	export let data: PageData;
	const { title, description, fediverse } = data.post;
</script>

<svelte:head>
	<title>{title} - Zlendy</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>

<article class="mb-4">
	<header class="flex min-h-48 flex-col items-center justify-center text-center">
		<h1 class="mb-4 text-5xl font-bold leading-tight">{title}</h1>
		<h2>{dayjs(data.post.createdAt).format('DD/MMM/YYYY [at] HH:mm')}</h2>
	</header>
	<!-- render the post -->
	<div class="mx-auto max-w-2xl px-4">
		<svelte:component this={data.component} />
	</div>
</article>

{#if fediverse}
	<section id="fediverse" class="mx-auto max-w-2xl px-4">
		<Post noteId={fediverse} />
		<Comments noteId={fediverse} />
	</section>
{/if}
