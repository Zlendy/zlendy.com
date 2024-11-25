<script lang="ts">
	import { SquareArrowOutUpRight } from 'lucide-svelte';
	import LinkHoverTitle from './link-hover-title.svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { getAnchorTarget, isSameOrigin } from './link';

	interface $$Props extends HTMLAnchorAttributes {}

	export let href: HTMLAnchorAttributes['href'] = undefined;
	const sameorigin = isSameOrigin(href);
</script>

<LinkHoverTitle
	class="bg-[linear-gradient(hsl(var(--foreground)/25%),hsl(var(--foreground)/25%))] bg-[length:100%_0.25rem] bg-[0%_100%] bg-no-repeat
	px-1 transition-all hover:bg-[length:100%_100%]"
	{...$$restProps}
	{href}
	target={getAnchorTarget(sameorigin)}
>
	<slot></slot>
	{#if !sameorigin}
		<SquareArrowOutUpRight class="inline h-[1em] w-[1em]" />
	{/if}
</LinkHoverTitle>
