<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article class="mb-4">
	<header class="relative z-10 flex min-h-48 flex-col items-center justify-center text-center">
		<h1 class="mb-4 text-5xl font-bold leading-tight">{data.post.title}</h1>
	</header>
	<!-- render the post -->
	<div class="post-container mx-[10vw]">
		<svelte:component this={data.component} />
	</div>
</article>

<style lang="scss">
	// Set default styles for HTML tags
	.post-container {
		:global(:where(p, ul, ol, blockquote)) {
			margin: 1rem 0 1rem 0;
		}

		:global(:where(ol, ul)) {
			padding-left: 2.5rem;
		}

		:global(ol) {
			list-style: decimal;
		}

		:global(ul) {
			list-style: disc;
		}

		:global(blockquote) {
			font-style: italic;
			margin-left: 1rem;
			position: relative;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				left: -1rem;
				width: 0.25rem;
				background-color: hsl(var(--foreground));
			}
		}

		:global(pre) {
			padding: 1rem;
			overflow: auto;
		}

		:global(a) {
			position: relative;
			padding-left: 0.2rem;
			padding-right: 0.2rem;
		}

		:global(a::before) {
			content: '';
			position: absolute;
			background-color: hsl(var(--foreground) / 25%);
			top: 100%;
			left: 0;
			right: 0;
			height: 0.25rem;
			transition: all 250ms ease-in-out;
		}

		:global(a:hover::before) {
			top: 0;
			height: 100%;
		}

		:global(h1) {
			font-size: 2.5rem;
		}

		:global(h2) {
			font-size: 2rem;
		}

		:global(h3) {
			font-size: 1.5rem;
		}

		:global(h4) {
			font-size: 1.25rem;
		}

		:global(h5) {
			font-size: 1rem;
		}

		:global(h6) {
			font-size: 0.75rem;
		}

		:global(tr) {
			transition: background-color 250ms ease-in-out;
		}

		:global(tbody tr:nth-child(odd)) {
			background-color: hsl(var(--foreground) / 5%);
		}

		:global(tbody tr:hover) {
			background-color: hsl(var(--foreground) / 10%);
		}

		:global(th) {
			border-bottom: 2px solid hsl(var(--foreground) / 75%);
		}

		:global(th:not([align])) {
			text-align: left;
		}

		:global(:where(th, td)) {
			padding-left: 1rem;
			padding-right: 1rem;
		}

		:global(td) {
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
		}

		:global(tr:not(:last-of-type) td) {
			border-bottom: 2px solid hsl(var(--foreground) / 25%);
		}
	}
</style>
