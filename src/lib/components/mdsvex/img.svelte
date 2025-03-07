<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import ImageZoom from '../image-zoom.svelte';

	

	interface Props {
		alt?: HTMLImgAttributes['alt'];
		[key: string]: any
	}

	let { alt = undefined, ...rest }: Props = $props();
</script>

<figure class="w-fit py-4">
	<ImageZoom class="max-h-96 w-full max-w-96 object-contain" {...rest} {alt} />
	{#if alt}
		<figcaption class="p-4 text-center text-muted-foreground">{alt}</figcaption>
	{/if}
</figure>
