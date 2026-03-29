<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	interface Minigame {
		name: string;
		description: string;
		slug: string;
	}

	const minigames: Minigame[] = [
		{
			name: 'El Impostor',
			description:
				'Imposter game, temporarily available only in Spanish while I work on internationalization for the whole website',
			slug: 'imposter'
		}
	];
</script>

<svelte:head>
	<title>Minigames - Zlendy</title>
</svelte:head>

<header class="flex min-h-48 flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-5xl leading-tight font-bold">Minigames</h1>
</header>

{#snippet minigameCard({ name, description, slug }: Minigame)}
	<a href="minigames/{slug}">
		<Card.Root>
			<Card.Header>
				<Card.Title>
					{name}
				</Card.Title>
			</Card.Header>
			<Card.Content class="whitespace-pre-wrap">
				{description}
			</Card.Content>
		</Card.Root>
	</a>
{/snippet}

<div
	class="bg-background/25 dark:bg-background/50 mx-2 mb-4 w-[calc(100%-1rem)] max-w-3xl rounded-xl border-2 px-4 pt-4 backdrop-blur-xs"
>
	<p class="mb-4">Silly minigames I made just because</p>

	<Heading tag="h1">Offline minigames</Heading>
	<div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each minigames as minigame (minigame.slug)}
			{@render minigameCard(minigame)}
		{/each}
	</div>
</div>
