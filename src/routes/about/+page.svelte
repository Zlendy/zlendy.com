<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import LinkArrow from '$lib/components/link-arrow.svelte';
</script>

<svelte:head>
	<title>About - Zlendy</title>
</svelte:head>

<header class="flex min-h-48 flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-5xl font-bold leading-tight">About</h1>
</header>

<div class="mx-auto mb-4 max-w-2xl px-4">
	<p class="text-lg">I go by Zlendy on the internet.</p>
	<p class="mb-8 text-lg">
		This has been my username for several years and I don't want to give it up, nor I want to let
		you down ;)
	</p>

	<h2 class="text-4xl">Quick facts</h2>
	<ul class="mb-8 list-disc pl-10">
		<li>
			I may be one of the few people born in Spain who doesn't like
			<LinkArrow href="https://en.wikipedia.org/wiki/Paella">paella.</LinkArrow>
		</li>
		<li>
			My profile picture was commissioned to
			<LinkArrow href="https://yubrich.carrd.co/" data-umami-event="about-yubrich">
				Yubrich.
			</LinkArrow> I have been a longtime fan of their work and wanted to personally support them!
		</li>
		<li>
			This website's logo was drawn by me on my tablet. I have a long way to go before I can call
			myself a good artist, though.
		</li>
	</ul>
	<h2 class="text-4xl">Social profiles</h2>
	<ul class="list-disc pl-10">
		<li>
			<LinkArrow rel="me" href="https://github.com/Zlendy" data-umami-event="about-github">
				<Logo name="github" />
				GitHub
			</LinkArrow>
		</li>
		<li>
			<LinkArrow
				rel="me"
				href="https://social.zlendy.com/@zlendy"
				title="ActivityPub-compatible server"
				data-umami-event="about-fediverse"
			>
				<Logo name="activitypub" />
				Sharkey
			</LinkArrow>
		</li>
		<li>
			<LinkArrow
				rel="me"
				href="https://bsky.app/profile/zlendy.com"
				data-umami-event="about-bluesky"
			>
				<Logo name="bluesky" />
				Bluesky
			</LinkArrow>
		</li>
		<li>
			<LinkArrow
				rel="me"
				href="https://www.pixiv.net/en/users/88820373"
				data-umami-event="about-pixiv"
			>
				<Logo name="pixiv" />
				Pixiv
			</LinkArrow>
		</li>
		<li>
			<LinkArrow rel="me" href="https://anilist.co/user/Zlendy" data-umami-event="about-anilist">
				<Logo name="anilist" />
				AniList
			</LinkArrow>
		</li>
		<li>
			<LinkArrow
				rel="me"
				href="https://steamcommunity.com/id/Zlendy"
				data-umami-event="about-steam"
			>
				<Logo name="steam" />
				Steam
			</LinkArrow>
		</li>
	</ul>
</div>
