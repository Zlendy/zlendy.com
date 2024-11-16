<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { SquareArrowOutUpRight } from 'lucide-svelte';

	export let href: string;
	export let title: string | undefined = undefined;
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		<a class="relative px-1" {href} {...$$restProps}>
			<slot></slot>
			<SquareArrowOutUpRight class="inline h-[1em] w-[1em]" />
		</a>
	</HoverCard.Trigger>
	{#if title}
		<HoverCard.Content>
			{title}
		</HoverCard.Content>
	{/if}
</HoverCard.Root>

<style lang="scss">
	a::before {
		content: '';
		position: absolute;
		background-color: hsl(var(--foreground) / 25%);
		top: calc(100% - 0.25rem);
		left: 0;
		right: 0;
		height: 0.25rem;
		transition: all 250ms ease-in-out;
		pointer-events: none;
	}

	a:hover::before {
		top: 0;
		height: 100%;
	}
</style>
