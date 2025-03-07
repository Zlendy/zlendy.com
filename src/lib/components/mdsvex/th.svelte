<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { children, ...rest }: Props = $props();
</script>

<th class="px-4" {...rest}>
	{@render children?.()}
</th>

<style lang="scss">
	th {
		border-bottom: 2px solid hsl(var(--foreground) / 75%);
	}

	th:not([align]) {
		text-align: left;
	}
</style>
