<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<tbody>
	{@render children?.()}
</tbody>

<style lang="scss">
	tbody :global(tr:nth-child(odd)) {
		background-color: hsl(var(--foreground) / 5%);
	}

	tbody :global(tr:hover) {
		background-color: hsl(var(--foreground) / 10%);
	}
</style>
