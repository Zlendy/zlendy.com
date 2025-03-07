<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { children, ...rest }: Props = $props();
</script>

<ol class="my-4 list-decimal pl-10" {...rest}>
	{@render children?.()}
</ol>
