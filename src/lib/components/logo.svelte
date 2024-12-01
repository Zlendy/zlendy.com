<script lang="ts">
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {
		name: string;
	}

	export let name: string;
	let className: HTMLBaseAttributes['class'] = undefined;
	export { className as class };
</script>

<i
	class="inline-block h-[1em] w-[1em] bg-foreground {className}"
	style="mask: url(/icons/logos/{name}.svg) center center / cover no-repeat"
	{...$$restProps}
></i>
