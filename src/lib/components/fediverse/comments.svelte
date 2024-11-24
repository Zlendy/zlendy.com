<script lang="ts">
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

	export let style: HTMLBaseAttributes['style'] = undefined;
	export let note: string;
	export let layer = 0;
	const fadeInDelay = 250; // ms;

	let visibleNote = false;

	async function loadData() {
		return await fediverseRequest({
			url: '/api/notes/children',
			body: {
				noteId: note,
				limit: 5,
				showQuotes: false
			},
			schema: NoteListSchema
		});
	}
</script>

<div use:intersect={{ threshold: 0.4 }} on:intersectonce={() => (visibleNote = true)}>
	{#if visibleNote}
		{#await loadData() then comments}
			{#each comments as post, index (post.id)}
				{@const hasReplies = post.repliesCount > 0}
				{@const postLink = `${PUBLIC_FEDIVERSE_HOST}/notes/${post.id}`}
				{@const replyLayer = layer + 1}
				{@const replyMarginLeft = `${replyLayer * 10}%`}

				<div
					{style}
					class="mb-4"
					in:fade|global={{ duration: 250, delay: fadeInDelay * index + fadeInDelay * layer }}
				>
					<Card.Root>
						{@const user = post.user}
						{@const handle = `@${user.username}@${user.host}`}
						<a href="{PUBLIC_FEDIVERSE_HOST}/{handle}" class="flex items-center space-y-1.5 p-6">
							<Avatar.Root>
								<Avatar.Image src={user.avatarUrl} alt="{handle}'s avatar" />
								<Avatar.Fallback>
									{@const firstLetter = user.username.charAt(0).toUpperCase()}
									{@const lastLetter = user.username.charAt(user.username.length - 1).toUpperCase()}
									{firstLetter}{lastLetter}
								</Avatar.Fallback>
							</Avatar.Root>
							<Card.Header class="overflow-hidden  p-0 pl-6">
								<Card.Title class="break-words">{user.name}</Card.Title>
								<Card.Description class="break-words">{handle}</Card.Description>
							</Card.Header>
						</a>
						<Card.Content class="break-words">
							<p>{post.text}</p>
						</Card.Content>
						<Card.Footer>
							<Engagement note={post} />
						</Card.Footer>
					</Card.Root>
				</div>

				{#if layer < 2}
					<svelte:self style="margin-left: {replyMarginLeft}" note={post.id} layer={replyLayer} />
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
