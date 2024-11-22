<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import ImageZoom from '../image-zoom.svelte';

	interface $$Props extends HTMLImgAttributes {}

	export let alt: HTMLImgAttributes['alt'] = undefined;
</script>

<figure class="w-fit">
	<ImageZoom class="max-h-96 w-full max-w-96 object-contain" {...$$restProps} {alt} />
	<figcaption class="p-4 text-center text-muted-foreground">{alt}</figcaption>
</figure>
