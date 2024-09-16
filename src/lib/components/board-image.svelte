<script lang="ts" context="module">
	export enum Status {
		Loading = 'loading',
		Loaded = 'loaded',
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

		private getRandomIntInclusive(min: number, max: number) {
			const minCeiled = Math.ceil(min);
			const maxFloored = Math.floor(max);
			return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
		}

		get(index: number) {
			if (this.list.at(index) === undefined)
				this.list[index] = {
					height: this.getRandomIntInclusive(100, 300), // px
					opacity: this.getRandomIntInclusive(50, 100) // %
				};

			return this.list[index];
		}
	}

	const placeholder = new Placeholder();
</script>

<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';

	type Loaded = {
		status: Status.Loaded;
	} & BoardImageData;

	type NotLoaded = {
		status: Exclude<Status, Status.Loaded>;
	};

	type $$Props = { index: number } & (Loaded | NotLoaded);
	let props = $$props as $$Props;

	function handleError() {
		props.status = Status.Error;
	}
</script>

<a class="zy-shadow-inner mb-1" href={props.status === Status.Loaded ? props.href : undefined}>
	{#if props.status === Status.Loaded}
		<img
			class="h-auto w-full"
			alt={props.text}
			title={props.text}
			src={props.src}
			on:error={handleError}
		/>
	{:else}
		{@const data = placeholder.get(props.index)}

		<Skeleton
			class="inline-block w-full {props.status === Status.Error && 'bg-red-500'}"
			style="height: {data.height}px; filter: opacity({data.opacity}%);"
		/>
	{/if}
</a>
