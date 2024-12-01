<script lang="ts">
	import ModeToggle from '$lib/components/modetoggle.svelte';
	import LinkHoverTitle from './link-hover-title.svelte';
	import LinkArrow from './link-arrow.svelte';
	import { Activity, ChartNoAxesCombined, CodeXml, Rss } from 'lucide-svelte';
	import { PUBLIC_PLAUSIBLE_HOST, PUBLIC_WEBSITE_HOST } from '$env/static/public';
	import Logo from './logo.svelte';

	const WEBSITE_HOST_NOPROTOCOL = PUBLIC_WEBSITE_HOST.replace(/^https?:\/\//, '');
</script>

<footer class="border-t">
	<a class="hidden" rel="me" href="https://social.zlendy.com/@zlendy">
		Fediverse link verification
	</a>

	<div
		class="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0"
	>
		<p>
			zlendy.com © 2024 Zlendy.
			<LinkArrow href="https://github.com/Zlendy/zlendy.com/blob/main/LICENSE.md">
				Read the license
			</LinkArrow>
		</p>
		<div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
			<div class="flex flex-wrap gap-4">
				<LinkHoverTitle
					rel="me"
					title="Fediverse blog account"
					href="https://social.zlendy.com/@blog"
					target="_blank"
				>
					<Logo name="activitypub" class="!h-[1.5em] !w-[1.5em]" />
				</LinkHoverTitle>
				<LinkHoverTitle title="RSS feed" href="/rss.xml" target="_blank">
					<Rss />
				</LinkHoverTitle>
				{#if PUBLIC_PLAUSIBLE_HOST}
					<LinkHoverTitle
						title="Public website analytics"
						href="{PUBLIC_PLAUSIBLE_HOST}/{WEBSITE_HOST_NOPROTOCOL}"
						target="_blank"
					>
						<ChartNoAxesCombined />
					</LinkHoverTitle>
				{/if}
				<LinkHoverTitle
					title="Website source code"
					href="https://github.com/Zlendy/zlendy.com"
					target="_blank"
				>
					<CodeXml />
				</LinkHoverTitle>
				<LinkHoverTitle
					title="Services uptime monitor"
					href="https://status.zlendy.com"
					target="_blank"
				>
					<Activity />
				</LinkHoverTitle>
			</div>
			<ModeToggle />
		</div>
	</div>
</footer>
