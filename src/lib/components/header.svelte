<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Menu, Search } from '@lucide/svelte';
	import ModeToggle from './modetoggle.svelte';

	interface Route {
		title: string;
		href: string;
		active?: boolean;
	}

	const base_routes: Route[] = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Blog',
			href: '/blog'
		},
		{
			title: 'Board',
			href: '/board'
		},
		{
			title: 'Developer',
			href: '/developer'
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

<header class="bg-background flex h-16 items-center gap-4 border-b px-4">
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
						{route.title}
					</a>
				{/each}
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	<div class="ml-auto flex flex-row">
		<ModeToggle />
	</div>
	<!-- <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form class="ml-auto flex-1 sm:flex-initial">
            <div class="relative">
                <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
            </div>
        </form>
    </div> -->
</header>
