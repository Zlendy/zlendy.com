<script lang="ts">
	import { onMount } from 'svelte';

	const host = 'https://social.zlendy.com';

	interface NoteImage {
		href: string;
		text: string;
		src: string;
	}

	let notes: NoteImage[] = [];

	let innerWidth = 0;
	let columns = 4;
	$: columns = innerWidth < 768 ? 2 : 4;

	let columnPercent: number;
	$: columnPercent = parseInt((100 / columns).toFixed(0));

	onMount(async () => {
		const response = await fetch(`${host}/api/users/notes`, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: '9o1mf96bw4ni0001',
				withRenotes: false,
				withReplies: false,
				withChannelNotes: false,
				withFiles: true,
				limit: 50,
				allowPartial: true,
				i: 'bZpFORLD9wsO9wAo'
			}),
			method: 'POST'
		});

		const data: any[] = await response.json();

		const new_notes: NoteImage[] = data
			.map((note: any) =>
				note.files.map((file: any) => ({
					href: `${host}/notes/${note.id}`,
					text: note.text,
					src: file.thumbnailUrl
				}))
			)
			.flat();

		notes = new_notes;
	});
</script>

<svelte:window bind:innerWidth />

<div class="my-4 flex h-full min-h-screen flex-wrap justify-center gap-4 px-4 md:px-[20vw]">
	{#each { length: columns } as _, column}
		<div class="flex flex-col gap-4" style="flex-basis: calc({columnPercent}% - 1rem)">
			{#each notes as { href, text, src }, index}
				{#if index % columns === column}
					<a {href}>
						<img class="w-full" alt={text} title={text} {src} />
					</a>
				{/if}
			{/each}
		</div>
	{/each}
</div>
