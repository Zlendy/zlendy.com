<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLOlAttributes } from 'svelte/elements';

	interface Props extends HTMLOlAttributes {
		children?: Snippet;
	}

	let { children, ...rest }: Props = $props();
</script>

<ol {...rest} class="my-4 list-decimal pl-10">
	{@render children?.()}
</ol>
