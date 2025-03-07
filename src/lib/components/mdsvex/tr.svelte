<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
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
		border-bottom: 2px solid hsl(var(--foreground) / 25%);
	}
</style>
