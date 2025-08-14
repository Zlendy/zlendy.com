<script lang="ts">
	import type { PageServerData } from './$types';
	import dayjs from 'dayjs';
	import { blogMetadataStore } from '$lib/components/metadata/store';
	import { onMount } from 'svelte';
	import BlogCard from '$lib/components/blog-card.svelte';

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();

	const now = dayjs();

	onMount(async () => {
		await blogMetadataStore.getAll();
	});
</script>

<svelte:head>
	<title>Blog - Zlendy</title>
</svelte:head>

<header class="flex min-h-48 flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-5xl leading-tight font-bold">Blog</h1>
</header>

<div class="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4 px-4">
	{#each data.posts as post}
		<BlogCard {post} {now} />
	{/each}
</div>
