<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import mediumZoom from 'medium-zoom';
	import type { PageData, PageServerData } from './$types';
	import { ChevronDown } from 'lucide-svelte';
	import BlogCard from '$lib/components/blog-card.svelte';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { blogMetadataStore } from '$lib/components/metadata/store';
	import Heading from '$lib/components/heading.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const post = $derived(data.post);

	const now = dayjs();

	onMount(async () => {
		if (!post) return;
		await blogMetadataStore.getOne(post.slug);
	});

	let avatar: HTMLImageElement | null = $state(null);
	let content = $state<HTMLDivElement>();
</script>

<svelte:head>
	<title>Zlendy</title>
</svelte:head>

<div
	class="mx-auto flex h-[calc(100vh+64px)] max-w-2xl flex-col items-center justify-center px-4 text-center"
>
	<Avatar.Root
		class="h-[192px] w-[192px]"
		onLoadingStatusChange={(status) => {
			if (status !== 'loaded') return;
			if (!avatar) return;

			mediumZoom(avatar, {
				background: 'hsl(var(--background))',
				margin: 16
			});
		}}
	>
		<Avatar.Image
			bind:ref={avatar}
			src="/images/avatar.avif"
			data-zoom-src="/images/avatar-full.avif"
			class="rounded-full"
			alt="Zlendy's avatar"
		/>
		<Avatar.Fallback class="text-[5rem]">ZY</Avatar.Fallback>
	</Avatar.Root>
	<h1 class="mb-4 text-5xl font-bold leading-tight">Zlendy</h1>
	<p class="text-lg">Hi there! Welcome to my little slice of the internet</p>
	<p class="mb-8 text-lg">I'm a web developer from Spain who loves contributing to FOSS projects</p>

	<button
		class="mb-16 animate-bounce opacity-25 transition-opacity hover:opacity-100"
		onclick={() => content?.scrollIntoView({ behavior: 'smooth' })}
	>
		<ChevronDown size={64} />
	</button>
</div>

<div class="mx-auto mb-4 max-w-2xl px-4" bind:this={content}>
	{#if post}
		<div class="mb-8">
			<div class="mb-4">
				<Heading tag="h1">Latest post</Heading>
			</div>
			<BlogCard {post} {now} />
		</div>
	{/if}

	<data.component />
</div>
