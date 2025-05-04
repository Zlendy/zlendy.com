<script lang="ts">
	import type { BlogMetadata } from '$lib/blog-metadata';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Eye, MessageCircleMore, SmilePlus } from 'lucide-svelte';

	interface Props {
		metadata: BlogMetadata;
	}

	let { metadata }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Eye class="inline" />
			{metadata.views}
		</Tooltip.Trigger>
		<Tooltip.Content>Views</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<MessageCircleMore class="inline" />
			{metadata.comments}
		</Tooltip.Trigger>
		<Tooltip.Content>Comments</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<SmilePlus class="inline" />
			{metadata.reactions}
		</Tooltip.Trigger>
		<Tooltip.Content>Reactions</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
