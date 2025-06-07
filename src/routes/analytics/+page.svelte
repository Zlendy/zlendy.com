<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

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
	<h1 class="mb-4 text-5xl leading-tight font-bold">Analytics</h1>
</header>

<div class="mx-auto mb-4 max-w-2xl px-4">
	<data.component />

	{#if mounted}
		<div class="flex h-16 items-center justify-center space-x-2" transition:fade={{ delay: 100 }}>
			<Switch id="tracking" bind:checked={tracking} />
			<Label for="tracking">Tracking</Label>
		</div>
	{/if}
</div>
