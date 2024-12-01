<script lang="ts" context="module">
	export const PAGE_TRANSITION_MS = 150;
</script>

<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import Footer from '$lib/components/footer.svelte';
	import { page } from '$app/stores';
	import { routes } from '$lib/routes';
	import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';
	import { PUBLIC_PLAUSIBLE_HOST } from '$env/static/public';
	import type { LayoutData } from './$types';
	import { fade } from 'svelte/transition';

	page.subscribe((page_value) => {
		routes.update((routes_value) =>
			routes_value.map((route) => ({
				...route,
				active:
					page_value.url.pathname === route.href ||
					(route.href !== '/' && page_value.url.pathname.startsWith(route.href))
			}))
		);
	});

	export let data: LayoutData;
</script>

<ModeWatcher />
<PlausibleAnalytics apiHost={PUBLIC_PLAUSIBLE_HOST} outboundLinks={true} />

<Header />
{#key data.currentRoute}
	<main
		class="h-full min-h-screen"
		in:fade={{ duration: PAGE_TRANSITION_MS, delay: PAGE_TRANSITION_MS }}
		out:fade={{ duration: PAGE_TRANSITION_MS }}
	>
		<slot />
	</main>
{/key}
<Footer />
