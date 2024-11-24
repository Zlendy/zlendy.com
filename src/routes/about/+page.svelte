<script lang="ts">
	import Icon from '$lib/components/icon.svelte';
	import LinkArrow from '$lib/components/link-arrow.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
</script>

<div class="relative z-10 mx-8 flex h-screen flex-col items-center justify-center text-center">
	<Avatar.Root class="h-[192px] w-[192px]">
		<Avatar.Image src="https://avatars.githubusercontent.com/u/22578704" alt="Zlendy's avatar" />
		<Avatar.Fallback class="text-[5rem]">ZY</Avatar.Fallback>
	</Avatar.Root>
	<h1 class="mb-4 text-5xl font-bold leading-tight">About</h1>
	<p class="text-lg">I go by Zlendy on the internet.</p>
	<p class="text-lg">
		This has been my username for several years and I don't want to give it up...
	</p>
	<p class="mb-8 text-lg">...nor I want to let you down ;)</p>
</div>

<div class="mx-8 mb-4 sm:mx-16 md:mx-32">
	<h2 class="text-4xl">Quick facts</h2>
	<ul class="mb-8 list-disc pl-10">
		<li>
			I may be one of the few people born in Spain who doesn't like
			<LinkArrow href="https://en.wikipedia.org/wiki/Paella">paella.</LinkArrow>
		</li>
		<li>
			My profile picture was commissioned to
			<LinkArrow href="https://yubrich.carrd.co/">Yubrich.</LinkArrow> I have been a long fan of their
			work and wanted to personally support them!
		</li>
		<li>
			This website's logo was drawn by me on my tablet. I have a long way to go before I can call
			myself a good artist, though.
		</li>
	</ul>
	<h2 class="text-4xl">Social profiles</h2>
	<ul class="list-disc pl-10">
		<li>
			<LinkArrow rel="me" href="https://github.com/Zlendy">
				<Icon name="github" />
				GitHub
			</LinkArrow>
		</li>
		<li>
			<LinkArrow rel="me" href="https://social.zlendy.com/@zlendy">
				<Icon name="activitypub" />
				Sharkey
			</LinkArrow>
			(ActivityPub-compatible server)
		</li>
		<li>
			<LinkArrow rel="me" href="https://bsky.app/profile/zlendy.com">
				<Icon name="bluesky" />
				Bluesky
			</LinkArrow>
		</li>
	</ul>
</div>
