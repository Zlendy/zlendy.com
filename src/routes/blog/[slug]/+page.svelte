<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article>
	<header>
		<h1>{data.post.title}</h1>
	</header>
	<!-- render the post -->
	<div>
		<svelte:component this={data.component} />
	</div>
</article>
