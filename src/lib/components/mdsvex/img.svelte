<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import ImageZoom from '../image-zoom.svelte';

	interface Props extends HTMLImgAttributes {
		alt?: HTMLImgAttributes['alt'];
	}

	let { alt = undefined, ...rest }: Props = $props();
</script>

<!-- As of 2025-03-08, this component crashes when mdsvex renders and HMR is enabled it unless I insert any element before <figure> -->
<!-- What the F$@% -->
<span></span>

<figure class="w-fit py-4">
	<ImageZoom class="max-h-96 w-full max-w-96 object-contain" {...rest} {alt} />
	{#if alt}
		<figcaption class="p-4 text-center text-muted-foreground">{alt}</figcaption>
	{/if}
</figure>
