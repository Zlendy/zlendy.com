<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { children, ...rest }: Props = $props();
</script>

<div class="overflow-auto">
	<table {...rest}>
		{@render children?.()}
	</table>
</div>
