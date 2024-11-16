<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { fade } from 'svelte/transition';
	import { type Note } from './types';
	import Button from '../ui/button/button.svelte';
	import Fa from 'svelte-fa';
	import { faRepeat, faReply } from '@fortawesome/free-solid-svg-icons';

	export let dataPromise: Promise<Note>;
	let className: string | undefined = undefined;
	export { className as class };

	async function loadReactions() {
		const data = await dataPromise;
		return Object.entries(data.reactions).map(([key, value]) => ({ name: key, amount: value }));
	}
</script>

<div class="mb-4 flex flex-wrap justify-center gap-2 {className}">
	{#await dataPromise then data}
		<Button size="sm" on:click={() => alert('Work in progress')}>
			<Fa icon={faReply} /> &nbsp; {data.repliesCount}
		</Button>
		<Button size="sm" on:click={() => alert('Work in progress')}>
			<Fa icon={faRepeat} /> &nbsp; {data.renoteCount}
		</Button>
	{/await}
</div>

{#await loadReactions() then reactions}
	{#if reactions.length}
		<div class="mb-4 flex flex-wrap justify-center gap-2 {className}">
			{#each reactions as reaction, index}
				<div in:fade|global={{ duration: 250, delay: 100 * index }}>
					<Badge variant="default" class="h-6 text-sm">{reaction.name} {reaction.amount}</Badge>
				</div>
			{/each}
		</div>
	{/if}
{/await}
