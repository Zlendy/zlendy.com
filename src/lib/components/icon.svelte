<script lang="ts">
	export let name: string;
</script>

<div style="mask: url(/icons/{name}.svg) no-repeat center;"></div>

<style>
	div {
		width: 1em;
		height: 1em;
		background-color: hsl(var(--foreground));
	}
</style>
