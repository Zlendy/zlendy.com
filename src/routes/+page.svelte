<script lang="ts">
	import { mode } from 'mode-watcher';
</script>

<div class="relative z-10 flex h-screen flex-col items-center justify-center text-center">
	<img
		src="/favicon.png"
		width="192"
		height="192"
		alt="logo"
		class:invisible={$mode === undefined}
		class:invert={$mode !== 'dark'}
	/>
	<h1 class="mb-4 text-5xl font-bold leading-tight">Zlendy</h1>
	<p class="mb-8 text-lg">Work in Progress</p>
</div>
