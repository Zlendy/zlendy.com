<script lang="ts">
	import Masonry from 'svelte-bricks';
	import { PUBLIC_FEDIVERSE_HOST, PUBLIC_FEDIVERSE_BOARD } from '$env/static/public';
	import { NoteListSchema } from '$lib/components/fediverse/types';
	import { fediverseRequest } from '$lib/components/fediverse/api';
	import LinkHoverTitle from '$lib/components/link-hover-title.svelte';

	const limit = 50;
	let masonryWidth: number | undefined = $state(0);
	let masonryHeight: number | undefined = $state(0);
	let masonryImagesLoaded: boolean[] = $state([]);

	interface BoardImageData {
		id: string;
		href: string;
		text: string;
		src: string;
	}

	async function loadData() {
		const data = await fediverseRequest({
			url: '/api/clips/notes',
			body: {
				allowPartial: true,
				clipId: PUBLIC_FEDIVERSE_BOARD,
				limit
			},
			schema: NoteListSchema
		});

		const images: BoardImageData[] = data
			.map((note) =>
				note.files.map((file) => ({
					id: file.id,
					href: `${PUBLIC_FEDIVERSE_HOST}/notes/${note.id}`,
					text: file.comment || note.text || 'Image by Zlendy',
					src: file.thumbnailUrl
				}))
			)
			.flat();

		return images;
	}
</script>

<svelte:head>
	<title>Board - Zlendy</title>
</svelte:head>

<header class="flex min-h-48 flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-5xl leading-tight font-bold">Board</h1>
</header>

<div class="mx-[20vw] my-4">
	{#await loadData() then items}
		<Masonry
			{items}
			minColWidth={200}
			maxColWidth={800}
			gap={24}
			animate={false}
			bind:masonryWidth
			bind:masonryHeight
		>
			{#snippet children({ idx, item: { src, text, href } })}
				<LinkHoverTitle
					class="bg-background hover:border-primary overflow-hidden rounded-xl border-2 border-transparent transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_1em_var(--primary)]"
					{href}
					title={text}
					target="_blank"
					data-umami-event="board-image"
					data-umami-event-url={href}
				>
					<img
						onload={() => (masonryImagesLoaded[idx] = true)}
						class="w-full transition-[filter] duration-300 ease-in-out"
						class:border-transparent={!masonryImagesLoaded[idx]}
						alt={text}
						{src}
					/>
				</LinkHoverTitle>
			{/snippet}
		</Masonry>
	{/await}
</div>

<style lang="scss">
	// When a user hovers over an img, darken them all except the hovered one
	:has(img:hover) img:not(:hover) {
		filter: grayscale(75%) opacity(50%);
	}
</style>
