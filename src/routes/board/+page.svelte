<script lang="ts">
	import BoardImage, { Status, type BoardImageData } from '$lib/components/board-image.svelte';
	import { fade } from 'svelte/transition';
	import * as v from 'valibot';

	const host = 'https://social.zlendy.com';
	const clipId = '9whhk416yuba00ni';
	const limit = 50;

	const NotesSchema = v.array(
		v.object({
			id: v.string(),
			text: v.nullish(v.string()),
			files: v.array(
				v.object({
					id: v.string(),
					comment: v.nullish(v.string()),
					thumbnailUrl: v.string()
				})
			)
		})
	);

	async function loadData() {
		const response = await fetch(`${host}/api/clips/notes`, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				allowPartial: true,
				clipId,
				limit
			}),
			method: 'POST'
		});

		const json = await response.json();
		const data = v.parse(NotesSchema, json);

		const images: BoardImageData[] = data
			.map((note) =>
				note.files.map((file) => ({
					id: file.id,
					href: `${host}/notes/${note.id}`,
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
