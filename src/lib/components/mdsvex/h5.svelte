<script lang="ts">
	import type { ComponentProps, Snippet } from 'svelte';
	import Heading from '../heading.svelte';

	interface Props extends ComponentProps<typeof Heading> {
		children?: Snippet;
	}

	let { children, ...rest }: Props = $props();
</script>

<Heading {...rest} tag="h5">
	{@render children?.()}
</Heading>
