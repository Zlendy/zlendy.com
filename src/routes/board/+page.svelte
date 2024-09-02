<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	const host = 'https://social.zlendy.com';

	interface NoteImage {
		id: string;
		href: string;
		text: string;
		src: string;
	}

	let notes: NoteImage[] = [];

	onMount(async () => {
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

		const data: any[] = await response.json();

		const new_notes: NoteImage[] = data
			.map((note: any) =>
				note.files.map((file: any) => ({
					id: file.id,
					href: `${host}/notes/${note.id}`,
					text: file.comment || note.text || 'Image by Zlendy',
					src: file.thumbnailUrl
				}))
			)
			.flat();

		notes = new_notes;
	});
</script>

<div
	class="zy-shadow-inner-container mx-[20vw] my-4 columns-1 gap-0 leading-[0] sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5"
>
	{#each notes as { id, href, text, src } (id)}
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
