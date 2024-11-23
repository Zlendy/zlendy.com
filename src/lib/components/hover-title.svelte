<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card';

	export let title: string | undefined = undefined;
</script>

<HoverCard.Root>
	<HoverCard.Trigger>
		<slot></slot>
	</HoverCard.Trigger>
	{#if title}
		<HoverCard.Content>
			{title}
		</HoverCard.Content>
	{/if}
</HoverCard.Root>
