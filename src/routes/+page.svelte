<script lang="ts">
	import { mode } from 'mode-watcher';
</script>

<div class="relative z-10 mx-8 flex h-screen flex-col items-center justify-center text-center">
	<img
		src="/favicon.png"
		width="192"
		height="192"
		alt="logo"
		class:invisible={$mode === undefined}
		class:invert={$mode !== 'dark'}
	/>
	<h1 class="mb-4 text-5xl font-bold leading-tight">Zlendy</h1>
	<p class="text-lg">Hi there! Welcome to my little slice of the internet</p>
	<p class="mb-8 text-lg">I'm a web developer from Spain who loves contributing to FOSS projects</p>
</div>
