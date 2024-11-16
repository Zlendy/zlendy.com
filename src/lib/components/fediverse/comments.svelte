<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { fade } from 'svelte/transition';
	import { fediverseRequest } from './api';
	import { NoteListSchema, type Note } from './types';
	import { PUBLIC_FEDIVERSE_HOST } from '$env/static/public';
	import Engagement from './engagement.svelte';
	import Link from '../link.svelte';

	export let note: string;
	export let layer = 0;
	const fadeInDelay = 250; // ms;

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

	async function notePromise(post: Note) {
		return post;
	}
</script>

{#await loadData() then comments}
	{#each comments as post, index}
		{@const hasReplies = post.repliesCount > 0}
		<div
			class:mb-4={hasReplies}
			in:fade|global={{ duration: 250, delay: fadeInDelay * index + fadeInDelay * layer }}
		>
			<Card.Root>
				{@const user = post.user}
				{@const handle = `@${user.username}@${user.host}`}
				{@const postLink = `${PUBLIC_FEDIVERSE_HOST}/notes/${post.id}`}
				<a href="{PUBLIC_FEDIVERSE_HOST}/{handle}" class="flex items-center space-y-1.5 p-6">
					<Avatar.Root>
						<Avatar.Image src={user.avatarUrl} alt="{handle}'s avatar" />
						<Avatar.Fallback>
							{@const firstLetter = user.username.charAt(0).toUpperCase()}
							{@const lastLetter = user.username.charAt(user.username.length - 1).toUpperCase()}
							{firstLetter}{lastLetter}
						</Avatar.Fallback>
					</Avatar.Root>
					<Card.Header class="p-0 pl-6">
						<Card.Title>{user.name}</Card.Title>
						<Card.Description>{handle}</Card.Description>
					</Card.Header>
				</a>
				<a href={postLink}>
					<Card.Content>
						<p>{post.text}</p>
					</Card.Content>
				</a>
				<Card.Footer class={hasReplies ? '' : 'pb-4'}>
					<div class="flex w-full flex-col">
						<Engagement dataPromise={notePromise(post)} class={hasReplies ? '' : 'mb-0'} />
						{#if layer < 2}
							<svelte:self note={post.id} layer={layer + 1} />
						{:else if hasReplies}
							<Card.Root>
								<div class="p-6">
									<Link href={postLink}>View thread continuation</Link>
								</div>
							</Card.Root>
						{/if}
					</div>
				</Card.Footer>
			</Card.Root>
		</div>
	{/each}
{/await}
