<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<blockquote
	class="relative my-4 ml-4 italic before:absolute before:-left-4 before:bottom-0 before:top-0 before:w-1 before:bg-foreground"
>
	{@render children?.()}
</blockquote>
