<script lang="ts">
	import { sineInOut } from 'svelte/easing';
	import { draw, type DrawParams } from 'svelte/transition';
	import { smoothScroll } from './link';
	import type { Snippet } from 'svelte';

	const styles = {
		h1: 'text-5xl',
		h2: 'text-4xl',
		h3: 'text-3xl',
		h4: 'text-2xl',
		h5: 'text-xl',
		h6: 'text-md'
	} as const;

	interface Props {
		tag: keyof typeof styles;
		children?: Snippet;
	}

	let { tag, children }: Props = $props();

	let element: HTMLElement = $state()!;

	let textContent: string = $derived(element?.textContent ?? '');

	function generateId(textContent: string) {
		if (!textContent) return '';

		return textContent.toLowerCase().matchAll(/\w+/g).toArray().join('-');
	}

	let id = $derived(generateId(textContent));

	let hover = $state(false);
	const millis = 100;
	const drawParams1: DrawParams = { duration: millis, easing: sineInOut, delay: millis };
	const drawParams2: DrawParams = { duration: millis, easing: sineInOut };
</script>

{#snippet svg(show: boolean, className: string = '')}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide-icon lucide lucide-hash absolute left-0 top-0 h-[1em] w-[1em] {className}"
	>
		{#if show}
			<line transition:draw={drawParams1} x1="4" x2="20" y1="9" y2="9"></line>
			<line transition:draw={drawParams2} x2="4" x1="20" y2="15" y1="15"></line>
			<line transition:draw={drawParams2} x2="10" x1="8" y2="3" y1="21"></line>
			<line transition:draw={drawParams1} x1="16" x2="14" y1="3" y2="21"></line>
		{/if}
	</svg>
{/snippet}

<svelte:element
	this={tag}
	bind:this={element}
	class="{styles[tag]} relative hyphens-auto break-words"
	{id}
	role="heading"
>
	<button
		class="h-[1em] w-[1em]"
		onclick={(e) => {
			e.preventDefault();
			smoothScroll(element);
		}}
		onpointerenter={() => (hover = true)}
		onpointerleave={() => (hover = false)}
	>
		{@render svg(true, 'opacity-25')}
		{@render svg(hover)}
	</button>

	{@render children?.()}
</svelte:element>
