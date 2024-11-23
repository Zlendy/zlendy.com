<script lang="ts">
	import { SquareArrowOutUpRight } from 'lucide-svelte';
	import HoverTitle from './hover-title.svelte';

	export let href: string;
	export let title: string | undefined = undefined;
</script>

<HoverTitle {title}>
	<a class="relative px-1" {href} {...$$restProps}>
		<slot></slot>
		<SquareArrowOutUpRight class="inline h-[1em] w-[1em]" />
	</a>
</HoverTitle>

<style lang="scss">
	a::before {
		content: '';
		position: absolute;
		background-color: hsl(var(--foreground) / 25%);
		top: calc(100% - 0.25rem);
		left: 0;
		right: 0;
		height: 0.25rem;
		transition: all 250ms ease-in-out;
		pointer-events: none;
	}

	a:hover::before {
		top: 0;
		height: 100%;
	}
</style>
