import { browser } from '$app/environment';
import type { HTMLAnchorAttributes } from 'svelte/elements';

export function isSameOrigin(href: HTMLAnchorAttributes['href']) {
	if (!browser) return true; // Avoid SSR errors in dev mode
	if (!href) return false;
	if (!href.startsWith('http')) return true; // This is a relative route
	return href.startsWith(window.location.origin);
}

export function getAnchorTarget(sameorigin: boolean): HTMLAnchorAttributes['target'] {
	return sameorigin ? undefined : '_blank';
}
