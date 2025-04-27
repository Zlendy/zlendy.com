<script lang="ts">
	import type { ComponentProps, Snippet } from 'svelte';
	import LinkArrow from '../link-arrow.svelte';
	import { isSameOrigin } from '../link';

	interface Props extends ComponentProps<typeof LinkArrow> {
		children?: Snippet;
	}

	let { children, href, ...rest }: Props = $props();
</script>

<LinkArrow
	data-umami-event={isSameOrigin(href) ? undefined : 'outbound-link-click'}
	data-umami-event-url={href}
	{href}
	{...rest}
>
	{@render children?.()}
</LinkArrow>
