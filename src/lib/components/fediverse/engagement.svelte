<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { fade } from 'svelte/transition';
	import { type Note } from './types';
	import Button from '../ui/button/button.svelte';
	import { PUBLIC_FEDIVERSE_HOST } from '$env/static/public';
	import Emoji from './emoji.svelte';
	import { MessageCircleMore, Repeat2 } from '@lucide/svelte';

	interface Props {
		note: Note;
	}

	let { note }: Props = $props();
	const href = `${PUBLIC_FEDIVERSE_HOST}/notes/${note.id}`;
	const reactions = getReactions(note);

	function getReactions(data: Note) {
		return Object.entries(data.reactions).map(([key, value]) => ({ name: key, amount: value }));
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-wrap justify-start gap-2">
		<Button size="sm" {href} target="_blank">
			<MessageCircleMore /> &nbsp; {note.repliesCount}
		</Button>
		<Button size="sm" {href} target="_blank">
			<Repeat2 /> &nbsp; {note.renoteCount}
		</Button>
	</div>

	{#if reactions.length}
		<div class="flex flex-wrap justify-start gap-2">
			{#each reactions as reaction, index}
				<div in:fade|global={{ duration: 250, delay: 100 * index }}>
					<Badge variant="default" class="h-6 text-sm" {href} target="_blank">
						<Emoji {note} name={reaction.name} />
						{reaction.amount}
					</Badge>
				</div>
			{/each}
		</div>
	{/if}
</div>
