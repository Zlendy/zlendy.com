<script lang="ts">
	import type { BlogMetadata } from '$lib/components/metadata/store';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Eye, MessageCircleMore, SmilePlus } from '@lucide/svelte';
	import FormatNumber from '../format-number.svelte';

	interface Props {
		metadata: BlogMetadata;
	}

	let { metadata }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class="hover:cursor-help">
			<Eye class="inline" />
			<FormatNumber value={metadata.views} />
		</Tooltip.Trigger>
		<Tooltip.Content>Views</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class="hover:cursor-help">
			<MessageCircleMore class="inline" />
			<FormatNumber value={metadata.comments} />
		</Tooltip.Trigger>
		<Tooltip.Content>Comments</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class="hover:cursor-help">
			<SmilePlus class="inline" />
			<FormatNumber value={metadata.reactions} />
		</Tooltip.Trigger>
		<Tooltip.Content>Reactions</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
