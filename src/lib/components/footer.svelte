<script lang="ts">
	import ModeToggle from '$lib/components/modetoggle.svelte';
	import Logo from '$lib/components/logo.svelte';
	import LinkHoverTitle from './link-hover-title.svelte';
</script>

<footer class="border-t">
	<div
		class="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0"
	>
		<p>zlendy.com © 2024 Zlendy.</p>
		<div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
			<div class="flex flex-wrap gap-4">
				<LinkHoverTitle title="ActivityPub" rel="me" href="https://social.zlendy.com/@zlendy">
					<Logo name="activitypub" />
				</LinkHoverTitle>
				<LinkHoverTitle title="Bluesky" rel="me" href="https://bsky.app/profile/zlendy.com">
					<Logo name="bluesky" />
				</LinkHoverTitle>
			</div>
			<ModeToggle />
		</div>
	</div>
</footer>
