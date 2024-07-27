<script lang="ts">
	import ModeToggle from '$lib/components/modetoggle.svelte';
	import Icon from '$lib/components/icon.svelte';
</script>

<footer class="border-t">
	<div
		class="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0"
	>
		<p>Copyright © 2024 - zlendy.com - All rights reserved.</p>
		<div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
			<a title="ActivityPub" rel="me" href="https://social.zlendy.com/@zlendy">
				<Icon name="activitypub" />
			</a>
			<a title="Bluesky" rel="me" href="https://bsky.app/profile/zlendy.com">
				<Icon name="bluesky" />
			</a>
			<ModeToggle />
		</div>
	</div>
</footer>
