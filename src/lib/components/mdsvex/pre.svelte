<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="relative">
	{@render children?.()}
</div>

<style lang="scss">
	div :global(pre) {
		padding: 1rem;
		overflow: auto;
	}
</style>
