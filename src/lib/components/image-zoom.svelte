<script lang="ts">
	import mediumZoom from 'medium-zoom';
	import type { Zoom, ZoomOptions } from 'medium-zoom';
	import type { Action } from 'svelte/action';

	export let src: string | undefined = undefined;
	export let alt: string | undefined = undefined;
	export let options: ZoomOptions | undefined = undefined;
	let customOptions: ZoomOptions | undefined = options;
	$: customOptions = { background: 'hsl(var(--background))', ...options };

	let zoom: Zoom;

	function getZoom() {
		if (!zoom) {
			zoom = mediumZoom(customOptions);
		}

		return zoom;
	}

	const attachZoom: Action<HTMLImageElement, ZoomOptions | undefined> = (
		node: HTMLImageElement,
		_?: ZoomOptions
	) => {
		const zoom = getZoom();
		zoom.attach(node);

		return {
			update(newOptions?: ZoomOptions) {
				if (!newOptions) return;
				zoom.update(newOptions);
			},
			destroy() {
				zoom.detach();
			}
		};
	};
</script>

<figure class="w-fit">
	<img
		class="max-h-96 w-full max-w-96 object-contain"
		{src}
		{alt}
		{...$$restProps}
		use:attachZoom={customOptions}
	/>
	<figcaption class="p-4 text-center text-muted-foreground">{alt}</figcaption>
</figure>
