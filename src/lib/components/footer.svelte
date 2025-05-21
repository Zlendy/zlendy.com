<script lang="ts">
	import LinkHoverTitle from './link-hover-title.svelte';
	import LinkArrow from './link-arrow.svelte';
	import { Activity, ChartNoAxesCombined, CodeXml, Rss } from '@lucide/svelte';
	import Logo from './logo.svelte';
	import dayjs from 'dayjs';
</script>

<footer class="border-t">
	<a class="hidden" rel="me" href="https://social.zlendy.com/@zlendy">
		Fediverse link verification
	</a>

	<div
		class="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0"
	>
		<p>
			zlendy.com © {dayjs().year()} Zlendy.
			<LinkArrow
				href="https://github.com/Zlendy/zlendy.com/blob/main/LICENSE.md"
				data-umami-event="footer-license"
			>
				Read the license
			</LinkArrow>
		</p>
		<div class="flex flex-row items-center gap-4 px-8 md:px-0">
			<LinkHoverTitle
				rel="me"
				title="Fediverse blog account"
				href="https://social.zlendy.com/@blog"
				target="_blank"
				data-umami-event="footer-fediverse-blog"
			>
				<Logo name="activitypub" class="!block !h-[1.5em] !w-[1.5em]" />
			</LinkHoverTitle>
			<LinkHoverTitle title="RSS feed" href="/rss.xml" target="_blank">
				<Rss />
			</LinkHoverTitle>
			<LinkHoverTitle title="Analytics" href="/analytics">
				<ChartNoAxesCombined />
			</LinkHoverTitle>
			<LinkHoverTitle
				title="Website source code"
				href="https://github.com/Zlendy/zlendy.com"
				target="_blank"
				data-umami-event="footer-source-code"
			>
				<CodeXml />
			</LinkHoverTitle>
			<LinkHoverTitle
				title="Services uptime monitor"
				href="https://status.zlendy.com"
				target="_blank"
				data-umami-event="footer-uptime"
			>
				<Activity />
			</LinkHoverTitle>
		</div>
	</div>
</footer>
