<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import type { Snippet } from 'svelte';

	interface Props {
		trigger: Snippet;
		content: Snippet;
	}

	const { trigger, content }: Props = $props();
</script>

<Accordion.Root
	type="single"
	class="my-4 w-full rounded-xl border-2 border-accent bg-card transition-colors hover:border-accent/25"
>
	<Accordion.Item value="item-1" class="border-b-0">
		<Accordion.Trigger class="p-4 text-left hover:no-underline">
			{@render trigger?.()}
		</Accordion.Trigger>
		<Accordion.Content class="-mb-4 p-4">
			{@render content?.()}
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
