import { browser } from '$app/environment';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import { pushState } from '$app/navigation';

export function isSameOrigin(href: HTMLAnchorAttributes['href']) {
	if (!browser) return true; // Avoid SSR errors in dev mode
	if (!href) return false;
	if (!href.startsWith('http')) return true; // This is a relative route
	return href.startsWith(window.location.origin);
}

export function getAnchorTarget(sameorigin: boolean): HTMLAnchorAttributes['target'] {
	return sameorigin ? undefined : '_blank';
}

export function smoothScroll(element: HTMLElement) {
	window.scrollTo({
		top: element.offsetTop,
		behavior: 'smooth'
	});

	pushState(`#${element.id}`, {}); // Change current URL without refreshing and add new entry to history
}
