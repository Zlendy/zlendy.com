<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	interface Props extends DropdownMenuPrimitive.RadioGroupProps {
		children?: Snippet;
	}

	let { value = $bindable(undefined), children, ...rest }: Props = $props();
</script>

<DropdownMenuPrimitive.RadioGroup {...rest} bind:value>
	{@render children?.()}
</DropdownMenuPrimitive.RadioGroup>
