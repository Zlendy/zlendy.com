<script lang="ts" context="module">
	export enum Status {
		LoadingList = 'loading-list',
		LoadingImage = 'loading-image',
		LoadedImage = 'loaded-image',
		Error = 'error'
	}

	export interface BoardImageData {
		id: string;
		href: string;
		text: string;
		src: string;
	}

	interface PlaceholderData {
		height: number;
		opacity: number;
	}

	class Placeholder {
		private list: PlaceholderData[] = [];

		get(index: number) {
			if (this.list.at(index) === undefined)
				this.list[index] = {
					height: getRandomIntInclusive(100, 300), // px
					opacity: getRandomIntInclusive(50, 100) // %
				};

			return this.list[index];
		}
	}

	const placeholder = new Placeholder();
</script>

<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { getRandomIntInclusive } from '$lib/utils';
	import LinkHoverTitle from './link-hover-title.svelte';

	const ImageStatus = [Status.LoadingImage, Status.LoadedImage];
	type ImageStatus = Status.LoadingImage | Status.LoadedImage;

	type HasImage = {
		index: number;
		status: ImageStatus;
	} & BoardImageData;

	type NoImage = {
		index: number;
		status: Exclude<Status, ImageStatus>;
	};

	type $$Props = HasImage | NoImage;
	let props = $$props as $$Props;

	function hasImage(props: $$Props): props is HasImage {
		return ImageStatus.includes(props.status);
	}

	function handleError() {
		props.status = Status.Error;
	}

	function handleLoad() {
		props.status = Status.LoadedImage;
	}

	const data = placeholder.get(props.index);
</script>

<div class="zy-shadow-inner mb-1">
	{#if props.status !== Status.LoadedImage}
		<Skeleton
			class="inline-block w-full {props.status === Status.Error && 'bg-red-500'}"
			style="height: {data.height}px; filter: opacity({data.opacity}%);"
		/>
	{/if}

	{#if hasImage(props)}
		<LinkHoverTitle href={props.href} title={props.text}>
			<img
				class="h-auto w-full"
				class:hidden={props.status !== Status.LoadedImage}
				alt={props.text}
				src={props.src}
				on:error={handleError}
				on:load={handleLoad}
			/>
		</LinkHoverTitle>
	{/if}
</div>
