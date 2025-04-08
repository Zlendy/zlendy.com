<script lang="ts">
	import Comments from './comments.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { fade } from 'svelte/transition';
	import { fediverseRequest } from './api';
	import { NoteListSchema, type Note } from './types';
	import { PUBLIC_FEDIVERSE_HOST } from '$env/static/public';
	import Engagement from './engagement.svelte';
	import LinkArrow from '../link-arrow.svelte';
	import type { HTMLBaseAttributes } from 'svelte/elements';
	import { intersect } from '@svelte-put/intersect';

	interface Props {
		style?: HTMLBaseAttributes['style'];
		noteId: string;
		layer?: number;
	}

	let { style = undefined, noteId, layer = 0 }: Props = $props();
	const fadeInDelay = 250; // ms;

	let visibleNote = $state(false);

	async function loadData() {
		return await fediverseRequest({
			url: '/api/notes/children',
			body: {
				noteId,
				limit: 5,
				showQuotes: false
			},
			schema: NoteListSchema
		});
	}
</script>

<div use:intersect={{ threshold: 0.4 }} onintersectonce={() => (visibleNote = true)}>
	{#if visibleNote}
		{#await loadData() then comments}
			{#each comments as note, index (note.id)}
				{@const user = note.user}
				{@const handle = `@${user.username}@${user.host}`}

				{@const userLink = `${PUBLIC_FEDIVERSE_HOST}/${handle}`}
				{@const postLink = `${PUBLIC_FEDIVERSE_HOST}/notes/${note.id}`}

				{@const hasReplies = note.repliesCount > 0}
				{@const replyLayer = layer + 1}
				{@const replyMarginLeft = `${replyLayer * 10}%`}

				<a
					href={postLink}
					target="_blank"
					{style}
					class="mb-4 block"
					in:fade|global={{ duration: 250, delay: fadeInDelay * index + fadeInDelay * layer }}
				>
					<Card.Root>
						<div class="flex items-center space-y-1.5 p-6 pb-0">
							<a href={userLink} target="_blank">
								<Avatar.Root>
									<Avatar.Image src={user.avatarUrl} alt="{handle}'s avatar" />
									<Avatar.Fallback>
										{@const firstLetter = user.username.charAt(0).toUpperCase()}
										{@const lastLetter = user.username
											.charAt(user.username.length - 1)
											.toUpperCase()}
										{firstLetter}{lastLetter}
									</Avatar.Fallback>
								</Avatar.Root>
							</a>
							<a class="overflow-hidden break-words" href={userLink} target="_blank">
								<Card.Header class="p-0 pl-6">
									<Card.Title>{user.name}</Card.Title>
									<Card.Description>{handle}</Card.Description>
								</Card.Header>
							</a>
						</div>
						<Card.Content class="break-words">
							<p>{note.text}</p>
						</Card.Content>
						<Card.Footer>
							<Engagement {note} />
						</Card.Footer>
					</Card.Root>
				</a>

				{#if layer < 2}
					<Comments style="margin-left: {replyMarginLeft}" noteId={note.id} layer={replyLayer} />
				{:else if hasReplies}
					<Card.Root class="mb-4" style="margin-left: {replyMarginLeft}">
						<div class="p-6">
							<LinkArrow href={postLink}>View thread continuation</LinkArrow>
						</div>
					</Card.Root>
				{/if}
			{/each}
		{/await}
	{/if}
</div>
