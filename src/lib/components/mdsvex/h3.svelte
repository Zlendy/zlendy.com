<script lang="ts">
	import Heading from '../heading.svelte';
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { children, ...rest }: Props = $props();
</script>

<Heading tag="h3" {...rest}>
	{@render children?.()}
</Heading>
