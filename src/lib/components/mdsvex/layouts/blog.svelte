<script lang="ts" module>
	// headings
	export { default as h1 } from '../h1.svelte';
	export { default as h2 } from '../h2.svelte';
	export { default as h3 } from '../h3.svelte';
	export { default as h4 } from '../h4.svelte';
	export { default as h5 } from '../h5.svelte';
	export { default as h6 } from '../h6.svelte';

	// code blocks
	export { default as pre } from '../pre.svelte';
	export { default as code } from '../code.svelte';

	// text
	export { default as blockquote } from '../blockquote.svelte';
	export { default as p } from '../p.svelte';
	export { default as a } from '$lib/components/link-arrow.svelte';

	// lists
	export { default as ul } from '../ul.svelte';
	export { default as ol } from '../ol.svelte';

	// table
	export { default as table } from '../table.svelte';
	export { default as tbody } from '../tbody.svelte';
	export { default as tr } from '../tr.svelte';
	export { default as th } from '../th.svelte';
	export { default as td } from '../td.svelte';

	// misc
	export { default as img } from '../img.svelte';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}
