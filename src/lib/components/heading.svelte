<script lang="ts">
	import { Hash } from 'lucide-svelte';

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
		window.history.pushState({}, '', `#${id}`);
	}
</script>

<svelte:element this={tag} bind:this={element} class={styles[tag]} {id}>
	<span bind:textContent contenteditable="true" class="hidden">
		<slot></slot>
	</span>
	<slot></slot>
	<a href="#{id}" on:click|preventDefault={smoothScroll}>
		<Hash class="inline h-[1em] w-[1em]" />
	</a>
</svelte:element>
