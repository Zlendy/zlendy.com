<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div
	class="relative z-10 flex h-full min-h-screen flex-col items-center justify-center text-center"
>
	<h1 class="mb-4 text-5xl font-bold leading-tight">Blog</h1>
	<ul class="mb-8 text-lg text-gray-300">
		{#each data.posts as post}
			<li>
				<a href={`blog/${post.slug}`}>{post.title}</a>
			</li>
		{/each}
	</ul>
</div>
