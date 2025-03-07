<script lang="ts">
	import { fediverseRequest } from './api';
	import { NoteSchema, type Note } from './types';
	import Engagement from './engagement.svelte';

	interface Props {
		noteId: string;
	}

	let { noteId }: Props = $props();

	async function loadNote(): Promise<Note> {
		return await fediverseRequest({
			url: '/api/notes/show',
			body: {
				noteId
			},
			schema: NoteSchema
		});
	}
</script>

{#await loadNote() then note}
	<div class="mb-4">
		<Engagement {note} />
	</div>
{/await}
