<script lang="ts">
	import { page } from '$app/state';
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		id: string;
		value: string;
		validate?: (value: string) => boolean;
		children?: Snippet;
	}

	let { id, value = $bindable(), validate = () => true, children }: Props = $props();
	let defaultValue: string = $state('');
	let lsKey = $derived(`${page.url.pathname}#${id}`);

	onMount(() => {
		const storedValue = localStorage.getItem(lsKey);
		if (storedValue) value = storedValue;

		defaultValue = value;
	});

	function setter(newValue: string) {
		value = validate(newValue) ? newValue : defaultValue;
		localStorage.setItem(lsKey, value);
	}
</script>

{@render children?.()}
<input
	class="px-1 font-mono"
	type="text"
	bind:value={() => value, setter}
	style="width: {value.length + 1}ch"
/>
