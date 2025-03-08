<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card';
	import type { ComponentProps, Snippet } from 'svelte';

	interface Props extends ComponentProps<typeof HoverCard.Trigger> {
		children?: Snippet;
	}

	let { title = undefined, children, ...rest }: Props = $props();
</script>

<HoverCard.Root>
	<HoverCard.Trigger {...rest}>
		{@render children?.()}
	</HoverCard.Trigger>
	{#if title}
		<HoverCard.Content>
			{title}
		</HoverCard.Content>
	{/if}
</HoverCard.Root>
