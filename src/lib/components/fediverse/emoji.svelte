<script lang="ts">
	import { fediverseProxy, fediverseRequest } from './api';
	import { fediverseEmojis } from './store';
	import { EmojiListSchema, type Note } from './types';

	interface Props {
		note: Note;
		name: string;
	}

	let { note, name }: Props = $props();

	const isCustomEmoji = name.startsWith(':');
	const nameWithoutColon = name.substring(1, name.length - 1);

	// If the emoji is from PUBLIC_FEDIVERSE_HOST
	if (nameWithoutColon.endsWith('@.') && Object.keys($fediverseEmojis).length === 0) {
		$fediverseEmojis['__fetch'] = '1'; // Prevent making multiple requests
		fetchEmojis();
	}

	async function fetchEmojis() {
		const { emojis } = await fediverseRequest({
			method: 'GET',
			url: '/api/emojis',
			schema: EmojiListSchema
		});

		for (const emoji of emojis) {
			$fediverseEmojis[`${emoji.name}@.`] = emoji.url;
		}
	}
</script>

{#if isCustomEmoji}
	{@const customEmoji = note.reactionEmojis[nameWithoutColon] || $fediverseEmojis[nameWithoutColon]}
	{#if customEmoji}
		<img
			class="mr-1 h-[1em] w-[1em] overflow-hidden"
			src="{fediverseProxy(customEmoji)}&emoji=1"
			alt={name}
		/>
	{/if}
{:else}
	{name}
{/if}
