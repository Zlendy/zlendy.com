<script lang="ts">
	import { SquareArrowOutUpRight } from 'lucide-svelte';
	import LinkHoverTitle from './link-hover-title.svelte';
</script>

<LinkHoverTitle
	class="relative px-1
	before:pointer-events-none before:absolute before:left-0 before:right-0 before:top-[calc(100%-0.25rem)] before:h-1 before:bg-foreground/25 before:transition-all
	hover:before:top-0 hover:before:h-full"
	{...$$restProps}
>
	<slot></slot>
	<SquareArrowOutUpRight class="inline h-[1em] w-[1em]" />
</LinkHoverTitle>
