<script lang="ts">
	import type { PageServerData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';

	export let data: PageServerData;

	dayjs.extend(relativeTime);

	const now = dayjs();
</script>

<header class="relative flex min-h-48 flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-5xl font-bold leading-tight">Blog</h1>
</header>

<div class="relative flex items-center justify-center gap-4 text-center">
	{#each data.posts as post}
		<Card.Root class="w-64">
			<Card.Header>
				<Card.Title>{post.title}</Card.Title>
				<Card.Description>
					{@const date = dayjs(post.date)}
					{@const formatDate = date.format('DD/MMM/YYYY @ HH:mm')}

					<Tooltip.Root>
						<Tooltip.Trigger>
							{now.diff(date, 'days', true) < 7 // Posted in the last week
								? date.from(now) // Show relative time
								: formatDate}
						</Tooltip.Trigger>
						<Tooltip.Content>
							{formatDate}
						</Tooltip.Content>
					</Tooltip.Root>
				</Card.Description>
			</Card.Header>
			<Card.Content>
				{post.description}
			</Card.Content>
			<Card.Footer>
				<a href="/blog/{post.slug}">Read more</a>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
