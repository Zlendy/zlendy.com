<script lang="ts">
	import { sineInOut } from 'svelte/easing';
	import { draw, type DrawParams } from 'svelte/transition';

	const styles = {
		h1: 'text-5xl',
		h2: 'text-4xl',
		h3: 'text-3xl',
		h4: 'text-2xl',
		h5: 'text-xl',
		h6: 'text-md'
	} as const;

	export let tag: keyof typeof styles;

	let element: HTMLElement;
	let textContent: string;

	function generateId(textContent: string) {
		if (!textContent) return '';

		return textContent.toLowerCase().matchAll(/\w+/g).toArray().join('-');
	}

	$: id = generateId(textContent);

	function smoothScroll() {
		window.scrollTo({
			top: element.offsetTop,
			behavior: 'smooth'
		});

		window.history.pushState({}, '', `#${id}`); // Change current URL without refreshing and add new entry to history
	}

	let hover = false;
	const millis = 100;
	const drawParams1: DrawParams = { duration: millis, easing: sineInOut, delay: millis };
	const drawParams2: DrawParams = { duration: millis, easing: sineInOut };
</script>

<svelte:element
	this={tag}
	bind:this={element}
	class="{styles[tag]} inline"
	{id}
	on:pointerenter={() => (hover = true)}
	on:pointerleave={() => (hover = false)}
>
	<!-- Workaround to get slotted content as text -->
	<span bind:textContent contenteditable="true" class="hidden">
		<slot></slot>
	</span>

	<slot></slot>

	<a href="#{id}" on:click|preventDefault={smoothScroll}>
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
			class="lucide-icon lucide lucide-hash inline h-[1em] w-[1em]"
		>
			{#if hover}
				<line transition:draw={drawParams1} x1="4" x2="20" y1="9" y2="9"></line>
				<line transition:draw={drawParams2} x2="4" x1="20" y2="15" y1="15"></line>
				<line transition:draw={drawParams2} x2="10" x1="8" y2="3" y1="21"></line>
				<line transition:draw={drawParams1} x1="16" x2="14" y1="3" y2="21"></line>
			{/if}
		</svg>
	</a>
</svelte:element>
