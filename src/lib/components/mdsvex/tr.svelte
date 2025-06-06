<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<tr>
	{@render children?.()}
</tr>

<style lang="scss">
	tr {
		transition: background-color 250ms ease-in-out;
	}

	tr:not(:last-of-type) :global(td) {
		border-bottom: 2px solid hsl(from var(--foreground) h s l / 25%);
	}
</style>
