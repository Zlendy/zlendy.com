<script lang="ts">
	interface Props {
		value: number;
	}

	let { value }: Props = $props();
</script>

{value.toLocaleString('en', { notation: 'compact', compactDisplay: 'short' })}
