<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { routes } from '$lib/routes';
	import { Menu, Search } from 'lucide-svelte';

	let title: string = '';
	routes.subscribe((value) => {
		const route = value.find((route) => route.active);
		if (!route) {
			title = '';
			return;
		}

		title = `${route.title} - `;
	});

	let menuOpen = false;
</script>

<svelte:head>
	<title>{title}Zlendy</title>
</svelte:head>

<header class="top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
	<nav
		class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
	>
		{#each $routes as route}
			<a
				href={route.href}
				class="text-foreground transition-colors hover:text-foreground {route.active
					? 'text-foreground'
					: 'text-muted-foreground'}"
			>
				{route.title}
			</a>
		{/each}
	</nav>
	<Sheet.Root bind:open={menuOpen}>
		<Sheet.Trigger asChild let:builder>
			<Button builders={[builder]} variant="outline" size="icon" class="shrink-0 md:hidden">
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left">
			<nav class="grid gap-6 text-lg font-medium">
				{#each $routes as route}
					<a
						href={route.href}
						class="hover:text-foreground"
						class:text-muted-foreground={!route.active}
						on:click={() => (menuOpen = false)}
					>
						{route.title}
					</a>
				{/each}
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	<!-- <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form class="ml-auto flex-1 sm:flex-initial">
            <div class="relative">
                <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
            </div>
        </form>
    </div> -->
</header>
