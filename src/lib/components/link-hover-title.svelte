<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card';
	import type { ComponentProps, Snippet } from 'svelte';
	import { isSameOrigin } from './link';

	interface Props extends ComponentProps<typeof HoverCard.Trigger> {
		children?: Snippet;
	}

	let { title = undefined, children, href, ...rest }: Props = $props();
</script>

<HoverCard.Root>
	<HoverCard.Trigger
		data-umami-event={isSameOrigin(href) ? undefined : 'outbound-link-click'}
		data-umami-event-url={href}
		{href}
		{...rest}
	>
		{@render children?.()}
	</HoverCard.Trigger>
	{#if title}
		<HoverCard.Content>
			{title}
		</HoverCard.Content>
	{/if}
</HoverCard.Root>
