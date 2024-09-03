<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import * as v from 'valibot';

	const host = 'https://social.zlendy.com';
	const clipId = '9whhk416yuba00ni';
	const limit = 50;

	function getRandomIntInclusive(min: number, max: number) {
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
	}

	const loading = Array.from({ length: limit }, () => ({
		height: getRandomIntInclusive(100, 600), // px
		opacity: getRandomIntInclusive(50, 100) // %
	}));

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

	interface Image {
		id: string;
		href: string;
		text: string;
		src: string;
	}

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

		const images: Image[] = data
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
		<!-- TODO: Create a reusable component -->
		<div class="zy-shadow-loading" out:fade={{ duration: 250 }}>
			{#each loading as { height, opacity }}
				<div class="zy-shadow-inner left-0 right-0 mb-1">
					<Skeleton
						class="inline-block w-full"
						style="height: {height}px; filter: opacity({opacity}%);"
					/>
				</div>
			{/each}
		</div>
	{:then images}
		<div class="zy-shadow-loaded" in:fade={{ delay: 251, duration: 250 }}>
			{#each images as { id, href, text, src } (id)}
				<a class="zy-shadow-inner mb-1" animate:flip={{ duration: 250, easing: quintOut }} {href}>
					<img class="h-auto w-full" alt={text} title={text} {src} />
				</a>
			{/each}
		</div>
	{:catch _}
		<!-- TODO: Create a reusable component -->
		<div class="zy-shadow-loaded" in:fade={{ delay: 251, duration: 250 }}>
			{#each loading as { height, opacity }}
				<div class="zy-shadow-inner left-0 right-0 mb-1">
					<Skeleton
						class="inline-block w-full bg-red-500"
						style="height: {height}px; filter: opacity({opacity}%);"
					/>
				</div>
			{/each}
		</div>
	{/await}
</div>

<style lang="scss">
	// Hides loaded elements while the animation is in progress
	.zy-shadow-inner-container:has(.zy-shadow-loading) .zy-shadow-loaded {
		// Using "display: none" would cancel the animation in .zy-shadow-loaded
		width: 0;
		height: 0;
	}

	// Fancy hover effect
	.zy-shadow-inner-container:has(.zy-shadow-inner:hover) .zy-shadow-inner:not(:hover) {
		filter: grayscale(75%) opacity(75%);
	}

	// Deduplicates common styles
	.zy-shadow-inner {
		transition: filter 250ms ease-in-out;
		display: block;
		position: relative;
		height: fit-content;
	}
</style>
