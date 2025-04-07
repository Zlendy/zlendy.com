<script lang="ts">
	import { mode } from 'mode-watcher';
</script>

<svelte:head>
	<title>Zlendy</title>
</svelte:head>

<div class="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
	<img
		src="/favicon.png"
		width="192"
		height="192"
		alt="logo"
		class:invisible={$mode === undefined}
		class:zy-light-logo={$mode !== 'dark'}
	/>
	<h1 class="mb-4 text-5xl font-bold leading-tight">Zlendy</h1>
	<p class="text-lg">Hi there! Welcome to my little slice of the internet</p>
	<p class="mb-8 text-lg">I'm a web developer from Spain who loves contributing to FOSS projects</p>
</div>

<style lang="scss">
	.zy-light-logo {
		filter: invert(75%) sepia(100%) hue-rotate(200deg);
	}
</style>
