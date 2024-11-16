<script lang="ts">
	import { SquareArrowOutUpRight } from 'lucide-svelte';

	export let href: string;
</script>

<a class="relative px-1" {href} {...$$restProps}>
	<slot></slot>
	<SquareArrowOutUpRight class="inline" />
</a>

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
