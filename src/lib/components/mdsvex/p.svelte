<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<p class="my-4 last-of-type:mb-0">
	{@render children?.()}
</p>
