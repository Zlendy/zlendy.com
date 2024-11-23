<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAnchorAttributes {}

	export let title: HTMLAnchorAttributes['title'] = undefined;
</script>

<HoverCard.Root>
	<HoverCard.Trigger {...$$restProps}>
		<slot></slot>
	</HoverCard.Trigger>
	{#if title}
		<HoverCard.Content>
			{title}
		</HoverCard.Content>
	{/if}
</HoverCard.Root>
