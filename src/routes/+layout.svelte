<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import Footer from '$lib/components/footer.svelte';
	import { page } from '$app/stores';
	import { routes } from '$lib/routes';
	import { PlausibleAnalytics } from '@accuser/svelte-plausible-analytics';

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
</script>

<ModeWatcher />
<PlausibleAnalytics apiHost="https://pce.zlendy.com" outboundLinks={true} />

<Header />
<main class="h-full min-h-screen">
	<slot></slot>
</main>
<Footer />
