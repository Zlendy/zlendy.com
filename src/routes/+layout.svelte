<script lang="ts" module>
	export const PAGE_TRANSITION_MS = 150;
</script>

<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import Footer from '$lib/components/footer.svelte';
	import { page } from '$app/stores';
	import { routes } from '$lib/routes';
	import type { LayoutData } from './$types';
	import { fade } from 'svelte/transition';
	import { UmamiAnalytics } from '@lukulent/svelte-umami';
	import {
		PUBLIC_UMAMI_WEBSITE_ID,
		PUBLIC_UMAMI_SRC,
		PUBLIC_WEBSITE_HOST
	} from '$env/static/public';
	import type { Snippet } from 'svelte';

	const WEBSITE_HOST_NOPROTOCOL = PUBLIC_WEBSITE_HOST.replace(/^https?:\/\//, '');

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

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}

	let { data, children }: Props = $props();
</script>

<UmamiAnalytics
	websiteID={PUBLIC_UMAMI_WEBSITE_ID}
	srcURL={PUBLIC_UMAMI_SRC}
	configuration={{ 'data-domains': WEBSITE_HOST_NOPROTOCOL }}
/>
<ModeWatcher />

<Header />
{#key data.currentRoute}
	<main
		class="h-full min-h-screen"
		in:fade={{ duration: PAGE_TRANSITION_MS, delay: PAGE_TRANSITION_MS }}
		out:fade={{ duration: PAGE_TRANSITION_MS }}
	>
		{@render children?.()}
	</main>
{/key}
<Footer />
