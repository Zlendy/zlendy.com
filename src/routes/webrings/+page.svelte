<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowBigLeft, ArrowBigRight, Globe, Shuffle } from '@lucide/svelte';

	interface Webring {
		name: string;
		description: string;
		url: string;
		random?: string;
		previous: string;
		next: string;
	}

	const webrings: Webring[] = [
		{
			name: 'bucket webring',
			description: 'this is a webring for cool people who like to make things!',
			url: 'https://webring.bucketfish.me',
			random: 'https://webring.bucketfish.me/redirect.html?to=random&name=Zlendy',
			previous: 'https://webring.bucketfish.me/redirect.html?to=prev&name=Zlendy',
			next: 'https://webring.bucketfish.me/redirect.html?to=next&name=Zlendy'
		},
		{
			name: 'Fediring',
			description: 'This webring is for the personal sites of any member of the fediverse',
			url: 'https://fediring.net',
			random: 'https://fediring.net/random',
			previous: 'https://fediring.net/previous?host=zlendy.com',
			next: 'https://fediring.net/next?host=zlendy.com'
		},
		{
			name: '🕸💍',
			description:
				'This proof-of-concept webring is a way for folks adding IndieWeb building blocks to their personal websites to find (and be found by) other folks with IndieWeb building blocks on their sites! ',
			url: 'https://xn--sr8hvo.ws',
			random: 'https://xn--sr8hvo.ws/random',
			previous: 'https://xn--sr8hvo.ws/previous',
			next: 'https://xn--sr8hvo.ws/next'
		}
	];

	interface Button88x31 {
		icon: string;
		href?: string;
	}

	const buttons: Button88x31[] = [
		{ icon: 'aperture_laboratories.png', href: 'https://thinkwithportals.com' },
		{ icon: 'archlinux.png', href: 'https://archlinux.org' },
		{ icon: 'banana.png' },
		{ icon: 'deltarune.png', href: 'https://deltarune.com/' },
		{ icon: 'deltarune_spamton.png' },
		{ icon: 'half_life.png', href: 'https://half-life.com' },
		{ icon: 'jellyfin.gif', href: 'https://jellyfin.org' },
		{ icon: 'kris_where_tf_are_we.png' },
		{ icon: 'lain.png', href: 'https://anilist.co/anime/339/Serial-Experiments-Lain/' },
		{ icon: 'lain_navi.jpeg' },
		{ icon: 'minecraft.gif', href: 'https://minecraft.net' },
		{ icon: 'nfts_no_fucking_thanks.png' },
		{ icon: 'proxmox.png', href: 'https://proxmox.com' },
		{ icon: 'ralsei_smoking_a_dart.gif' },
		{ icon: 'say_no_to_web3.gif' },
		{ icon: 'scp.gif', href: 'https://scp-wiki.wikidot.com' },
		{ icon: 'signalis.gif', href: 'https://rose-engine.org/signalis' },
		{ icon: 'steam.gif', href: 'https://store.steampowered.com' },
		{ icon: 'tested_on_firefox.png', href: 'https://firefox.com' },
		{ icon: 'undertale_act.png', href: 'https://undertale.com' },
		{ icon: 'utdr.png' },
		{ icon: 'wii.png', href: 'https://wii.com' },
		{ icon: 'written_by_a_human.png' },
		{ icon: 'yume_nikki.gif', href: 'https://store.steampowered.com/app/650700/Yume_Nikki' },
		{ icon: 'zed_industries.png', href: 'https://zed.dev' }
	];
</script>

<svelte:head>
	<title>Webrings - Zlendy</title>
</svelte:head>

<header class="flex min-h-48 flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-5xl leading-tight font-bold">Webrings</h1>
</header>

<div
	class="bg-background/25 dark:bg-background/50 mx-2 mb-4 flex w-[calc(100%-1rem)] max-w-3xl flex-col rounded-xl border-2 backdrop-blur-xs"
>
	{#each webrings as { name, description, url, random, previous, next } (url)}
		<div class="grid grid-cols-6 gap-4 not-last:border-b-2">
			<a
				class="group text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
				href={previous}
			>
				<ArrowBigLeft class="transition-transform ease-in-out group-hover:-translate-x-2" />
			</a>
			<div class="col-span-4 flex flex-col gap-4 p-4 text-center">
				<h3 class="text-2xl">{name}</h3>
				<p>{description}</p>
				<div class="flex flex-row justify-center gap-4">
					<Button href={url}>
						<Globe />
						Website
					</Button>
					{#if random}
						<Button href={random}>
							<Shuffle />
							Random
						</Button>
					{/if}
				</div>
			</div>
			<a
				class="group text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
				href={next}
			>
				<ArrowBigRight class="transition-transform ease-in-out group-hover:translate-x-2" />
			</a>
		</div>
	{/each}
</div>

<div class="flex max-w-3xl flex-wrap justify-center gap-4">
	{#each buttons as { icon, href } (icon)}
		<a {href} target="_blank" data-umami-event="88x31" data-umami-event-url={href}>
			<img src="/images/88x31/{icon}" alt={icon} />
		</a>
	{/each}
</div>
