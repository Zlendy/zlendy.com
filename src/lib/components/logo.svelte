<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		name: string;
	}

	let { name, class: className = undefined, ...rest }: Props = $props();
</script>

<i
	class="bg-foreground inline-block h-[1em] w-[1em] {className}"
	style="mask: url(/icons/logos/{name}.svg) center center / cover no-repeat"
	{...rest}
></i>
