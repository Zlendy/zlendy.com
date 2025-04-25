<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import LinkArrow from '$lib/components/link-arrow.svelte';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let mounted = $state(false);
	let tracking = $state(true);

	onMount(() => {
		tracking = localStorage.getItem('umami.disabled') !== '1';
		mounted = true;
	});

	$effect(() => {
		if (tracking) localStorage.removeItem('umami.disabled');
		else localStorage.setItem('umami.disabled', '1');
	});
</script>

<svelte:head>
	<title>Analytics - Zlendy</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<header class="flex min-h-48 flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-5xl font-bold leading-tight">Analytics</h1>
</header>

<div class="mx-auto mb-4 max-w-2xl px-4">
	<p class="mb-8">
		This website uses
		<LinkArrow href="https://umami.is/">
			<Logo name="umami" />
			Umami Analytics
		</LinkArrow>
		to collect privacy-friendly analytics about your visit.
	</p>
	<p>I'd like to have access to this information because:</p>
	<ul class="mb-8 list-disc pl-10">
		<li>
			It shows me which blog articles have better engagement. (which ones you read and for how long
			you've been reading them).
		</li>
		<li>
			I'd like to know which websites are linking to mine
			<LinkArrow href="https://en.wikipedia.org/wiki/HTTP_referer">(referrer).</LinkArrow>
		</li>
	</ul>

	<p>
		I am a privacy-concious guy, so I have taken measures to collect as little data about you as
		possible.
	</p>
	<p>Even so, I understand if you'd like to opt-out of getting tracked.</p>

	{#if mounted}
		<div class="flex h-16 items-center justify-center space-x-2" transition:fade={{ delay: 100 }}>
			<Switch id="tracking" bind:checked={tracking} />
			<Label for="tracking">Tracking</Label>
		</div>
	{/if}
</div>
