<script lang="ts">
	import BoardImage, { Status, type BoardImageData } from '$lib/components/board-image.svelte';
	import { fade } from 'svelte/transition';
	import { PUBLIC_FEDIVERSE_HOST, PUBLIC_FEDIVERSE_BOARD } from '$env/static/public';
	import { NoteListSchema } from '$lib/components/fediverse/types';
	import { fediverseRequest } from '$lib/components/fediverse/api';

	const limit = 50;

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

<div
	class="zy-shadow-inner-container mx-[20vw] my-4 columns-1 gap-1 leading-[0] sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5"
>
	{#await loadData()}
		<div class="zy-shadow-loading-list" out:fade={{ duration: 250 }}>
			{#each { length: limit } as _, index}
				<BoardImage status={Status.LoadingList} {index} />
			{/each}
		</div>
	{:then images}
		<div class="zy-shadow-loaded-list" in:fade={{ delay: 251, duration: 250 }}>
			{#each images as image, index (image.id)}
				<BoardImage status={Status.LoadingImage} {index} {...image} />
			{/each}
		</div>
	{:catch _}
		<div class="zy-shadow-loaded-list" in:fade={{ delay: 251, duration: 250 }}>
			{#each { length: limit } as _, index}
				<BoardImage status={Status.Error} {index} />
			{/each}
		</div>
	{/await}
</div>

<style lang="scss">
	// Hides loaded elements while the animation is in progress
	.zy-shadow-inner-container:global(:has(.zy-shadow-loading-list) .zy-shadow-loaded-list) {
		// Using "display: none" would cancel the animation in .zy-shadow-loaded-list
		width: 0;
		height: 0;
	}

	// Fancy hover effect
	.zy-shadow-inner-container:global(:has(.zy-shadow-inner:hover) .zy-shadow-inner:not(:hover)) {
		filter: grayscale(75%) opacity(75%);
	}

	// Deduplicates common styles
	.zy-shadow-inner-container :global(.zy-shadow-inner) {
		transition: filter 250ms ease-in-out;
		display: block;
		position: relative;
		height: fit-content;
	}
</style>
