<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const title = data.post.title;
</script>

<svelte:head>
	<title>{title} - Zlendy</title>
	<meta property="og:title" content={title} />
</svelte:head>

<article class="mb-4">
	<header class="relative z-10 flex min-h-48 flex-col items-center justify-center text-center">
		<h1 class="mb-4 text-5xl font-bold leading-tight">{title}</h1>
	</header>
	<!-- render the post -->
	<div class="mx-[10vw]">
		<svelte:component this={data.component} />
	</div>
</article>
