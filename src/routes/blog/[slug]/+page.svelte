<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article>
	<header class="relative z-10 flex min-h-48 flex-col items-center justify-center text-center">
		<h1 class="mb-4 text-5xl font-bold leading-tight">{data.post.title}</h1>
	</header>
	<!-- render the post -->
	<div class="mx-[10vw]">
		<svelte:component this={data.component} />
	</div>
</article>
