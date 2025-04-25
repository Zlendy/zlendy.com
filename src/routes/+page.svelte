<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
</script>

<svelte:head>
	<title>Zlendy</title>
</svelte:head>

<div class="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
	<Avatar.Root class="h-[192px] w-[192px]">
		<Avatar.Image src="https://avatars.githubusercontent.com/u/22578704" alt="Zlendy's avatar" />
		<Avatar.Fallback class="text-[5rem]">ZY</Avatar.Fallback>
	</Avatar.Root>
	<h1 class="mb-4 text-5xl font-bold leading-tight">Zlendy</h1>
	<p class="text-lg">Hi there! Welcome to my little slice of the internet</p>
	<p class="mb-8 text-lg">I'm a web developer from Spain who loves contributing to FOSS projects</p>
</div>
