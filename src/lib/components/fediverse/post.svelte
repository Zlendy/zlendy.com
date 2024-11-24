<script lang="ts">
	import { fediverseRequest } from './api';
	import { NoteSchema, type Note } from './types';
	import Engagement from './engagement.svelte';

	export let note: string;

	async function loadNote(): Promise<Note> {
		return await fediverseRequest({
			url: '/api/notes/show',
			body: {
				noteId: note
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
