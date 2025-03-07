<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';

	

	interface Props {
		name: string;
		class?: HTMLBaseAttributes['class'];
		[key: string]: any
	}

	let { name, class: className = undefined, ...rest }: Props = $props();
	
</script>

<i
	class="inline-block h-[1em] w-[1em] bg-foreground {className}"
	style="mask: url(/icons/logos/{name}.svg) center center / cover no-repeat"
	{...rest}
></i>
