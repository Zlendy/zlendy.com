<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<code class="my-4 bg-[#24292e] px-1 text-[#e1e4e8]">
	{@render children?.()}
</code>
