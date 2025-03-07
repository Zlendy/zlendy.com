<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<ul class="my-4 list-disc pl-10">
	{@render children?.()}
</ul>
