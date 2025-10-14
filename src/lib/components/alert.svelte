<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Info, TriangleAlert } from '@lucide/svelte';
	import type { Component, Snippet } from 'svelte';

	type AlertVariants = keyof typeof Alert.alertVariants.variants.variant;

	interface Props {
		children?: Snippet;
		variant: AlertVariants;
	}

	const variants: Record<AlertVariants, { title: string; icon: Component }> = {
		default: {
			title: 'Info',
			icon: Info
		},
		destructive: {
			title: 'Be careful!',
			icon: TriangleAlert
		},
		warning: {
			title: 'Warning',
			icon: TriangleAlert
		}
	};

	const { children, variant }: Props = $props();
	const derivedVariant = $derived(variants[variant]);
</script>

<Alert.Root {variant} class="my-4">
	<derivedVariant.icon class="size-4" />
	<Alert.Title>{derivedVariant.title}</Alert.Title>
	<Alert.Description class="-my-4 mx-0 block">
		{@render children?.()}
	</Alert.Description>
</Alert.Root>
