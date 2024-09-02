<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import * as v from 'valibot';

	const host = 'https://social.zlendy.com';

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

	let image: Image[] = [];

	onMount(async () => {
		try {
			const response = await fetch(`${host}/api/clips/notes`, {
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					allowPartial: true,
					clipId: '9whhk416yuba00ni',
					limit: 50
				}),
				method: 'POST'
			});

			const json = await response.json();
			const data = v.parse(NotesSchema, json);

			const new_notes: Image[] = data
				.map((note) =>
					note.files.map((file) => ({
						id: file.id,
						href: `${host}/notes/${note.id}`,
						text: file.comment || note.text || 'Image by Zlendy',
						src: file.thumbnailUrl
					}))
				)
				.flat();

			image = new_notes;
		} catch (e) {
			console.error(e);
		}
	});
</script>

<div
	class="zy-shadow-inner-container mx-[20vw] my-4 columns-1 gap-0 leading-[0] sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5"
>
	{#each image as { id, href, text, src } (id)}
		<a class="zy-shadow-inner" animate:flip={{ duration: 250, easing: quintOut }} {href}>
			<img class="h-auto w-full" alt={text} title={text} {src} />
		</a>
	{/each}
</div>

<style>
	.zy-shadow-inner-container:has(.zy-shadow-inner:hover) .zy-shadow-inner:not(:hover) {
		filter: grayscale(75%) opacity(75%);
	}

	.zy-shadow-inner {
		transition: filter 250ms ease-in-out;
		display: block;
		position: relative;
		height: fit-content;
	}
</style>
