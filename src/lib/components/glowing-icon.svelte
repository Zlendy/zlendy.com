<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends HTMLAnchorAttributes {
		children: Snippet;
		title: string;
	}

	const { children, href, title, ...rest }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<a
				class="bg-popover hover:border-primary flex aspect-square size-14 items-center justify-center rounded-xl transition-all hover:border-2 hover:drop-shadow-[0_0_1em_var(--primary)]"
				{href}
				{...rest}
				target="_blank"
			>
				{@render children?.()}
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content>
			{title}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
