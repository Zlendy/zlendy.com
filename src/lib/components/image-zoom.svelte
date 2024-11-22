<script lang="ts">
	import mediumZoom from 'medium-zoom';
	import type { Zoom, ZoomOptions } from 'medium-zoom';
	import type { Action } from 'svelte/action';
	import type { HTMLImgAttributes } from 'svelte/elements';

	interface $$Props extends HTMLImgAttributes {}

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

<!-- svelte-ignore a11y-missing-attribute -->
<img {...$$restProps} use:attachZoom={customOptions} />
