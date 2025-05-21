<script lang="ts">
	import { SquareArrowOutUpRight } from '@lucide/svelte';
	import LinkHoverTitle from './link-hover-title.svelte';
	import { getAnchorTarget, isSameOrigin, smoothScroll } from './link';
	import type { ComponentProps, Snippet } from 'svelte';

	interface Props extends ComponentProps<typeof LinkHoverTitle> {
		children?: Snippet;
	}

	let { href = undefined, children, ...rest }: Props = $props();
	const sameorigin = isSameOrigin(href);

	function onclick(e: Event) {
		if (!href?.startsWith('#')) return; // Early return if element doesn't start with "#"
		const element = document.querySelector<HTMLElement>(href); // "#element" is used to select an element by ID
		if (!element) return;

		e.preventDefault();
		smoothScroll(element);
	}
</script>

<LinkHoverTitle
	class="bg-[linear-gradient(hsl(var(--foreground)/25%),hsl(var(--foreground)/25%))] bg-[length:100%_0.25rem] bg-[0%_100%]
	bg-no-repeat px-1 transition-all hover:bg-[length:100%_100%]"
	{...rest}
	{href}
	target={getAnchorTarget(sameorigin)}
	{onclick}
>
	{@render children?.()}{#if !sameorigin}
		&nbsp;<SquareArrowOutUpRight class="inline h-[1em] w-[1em]" />
	{/if}
</LinkHoverTitle>
