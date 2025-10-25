<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Braces, House, Icon, Images, Menu, Newspaper, RefreshCw } from '@lucide/svelte';
	import ModeToggle from './modetoggle.svelte';

	interface Route {
		icon: typeof Icon;
		title: string;
		href: string;
		active?: boolean;
	}

	const base_routes: Route[] = [
		{
			icon: House,
			title: 'Home',
			href: '/'
		},
		{
			icon: Newspaper,
			title: 'Blog',
			href: '/blog'
		},
		{
			icon: Images,
			title: 'Board',
			href: '/board'
		},
		{
			icon: Braces,
			title: 'Developer',
			href: '/developer'
		},
		{
			icon: RefreshCw,
			title: 'Webrings',
			href: '/webrings'
		}
	];

	const routes = $derived(
		base_routes.map((route) => ({
			...route,
			active:
				page.url.pathname === route.href ||
				(route.href !== '/' && page.url.pathname.startsWith(route.href))
		}))
	);

	let menuOpen = $state(false);
</script>

<header
	class="bg-background/40 dark:bg-background/80 sticky top-2 z-50 m-2 flex h-16 items-center gap-4 rounded-xl border px-4 backdrop-blur-md"
>
	<nav
		class="hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
	>
		{#each routes as route}
			<a
				href={route.href}
				class="text-foreground hover:text-foreground transition-colors {route.active
					? 'text-foreground font-bold'
					: 'text-muted-foreground'}"
			>
				<route.icon class="inline" size={18} />
				{route.title}
			</a>
		{/each}
	</nav>
	<Sheet.Root bind:open={menuOpen}>
		<Button
			variant="outline"
			size="icon"
			class="shrink-0 md:hidden"
			onclick={() => (menuOpen = !menuOpen)}
		>
			<Menu class="h-5 w-5" />
			<span class="sr-only">Toggle navigation menu</span>
		</Button>
		<Sheet.Content side="left" class="p-6">
			<nav class="grid gap-6 text-lg font-medium">
				{#each routes as route}
					<a
						href={route.href}
						class="hover:text-foreground"
						class:text-muted-foreground={!route.active}
						class:font-bold={route.active}
						onclick={() => (menuOpen = false)}
					>
						<route.icon class="inline" size={18} />
						{route.title}
					</a>
				{/each}
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	<div class="ml-auto flex flex-row">
		<ModeToggle />
	</div>
</header>
