<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<ul class="my-4 list-disc pl-10">
	{@render children?.()}
</ul>
