<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { children, ...rest }: Props = $props();
</script>

<td class="px-4 py-2" {...rest}>
	{@render children?.()}
</td>
