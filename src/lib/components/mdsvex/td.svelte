<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLTdAttributes } from 'svelte/elements';

	interface Props extends HTMLTdAttributes {
		children?: Snippet;
	}

	let { children, ...rest }: Props = $props();
</script>

<td {...rest} class="px-4 py-2">
	{@render children?.()}
</td>
