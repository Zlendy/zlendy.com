<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLThAttributes } from 'svelte/elements';

	interface Props extends HTMLThAttributes {
		children?: Snippet;
	}

	let { children, ...rest }: Props = $props();
</script>

<th {...rest} class="px-4">
	{@render children?.()}
</th>

<style lang="scss">
	th {
		border-bottom: 2px solid hsl(from var(--foreground) h s l / 75%);
	}

	th:not([align]) {
		text-align: left;
	}
</style>
