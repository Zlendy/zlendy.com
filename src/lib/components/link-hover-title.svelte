<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	

	interface Props {
		title?: HTMLAnchorAttributes['title'];
		children?: import('svelte').Snippet;
		[key: string]: any
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
