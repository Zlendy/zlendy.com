<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLTableAttributes } from 'svelte/elements';

	interface Props extends HTMLTableAttributes {
		children?: Snippet;
	}

	let { children, ...rest }: Props = $props();
</script>

<div class="my-4 overflow-auto">
	<table {...rest}>
		{@render children?.()}
	</table>
</div>
