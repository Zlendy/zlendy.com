<script lang="ts">
	import { run } from 'svelte/legacy';

	import mediumZoom from 'medium-zoom';
	import type { Zoom, ZoomOptions } from 'medium-zoom';
	import type { Action } from 'svelte/action';
	import type { HTMLImgAttributes } from 'svelte/elements';

	

	interface Props {
		options?: ZoomOptions | undefined;
		[key: string]: any
	}

	let { options = undefined, ...rest }: Props = $props();
	let customOptions: ZoomOptions | undefined = $state(options);
	run(() => {
		customOptions = { background: 'hsl(var(--background))', ...options };
	});

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

<!-- svelte-ignore a11y_missing_attribute -->
<img {...rest} use:attachZoom={customOptions} />
