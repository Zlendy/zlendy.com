<script lang="ts">
	import { fediverseRequest } from './api';
	import { NoteSchema, type Note } from './types';
	import Engagement from './engagement.svelte';

	export let note: string;

	async function loadData(): Promise<Note> {
		return await fediverseRequest({
			url: '/api/notes/show',
			body: {
				noteId: note
			},
			schema: NoteSchema
		});
	}
</script>

<div class="mb-4">
	<Engagement dataPromise={loadData()} />
</div>
