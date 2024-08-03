import { writable } from 'svelte/store';

interface BaseRoute {
	title: string;
	href: string;
}

export type Route = BaseRoute & { active: boolean };

const base_routes: BaseRoute[] = [
	{
		title: 'Home',
		href: '/'
	},
	{
		title: 'Blog',
		href: '/blog'
	},
	{
		title: 'Board',
		href: '/board'
	},
	{
		title: 'About',
		href: '/about'
	}
];

export const routes = writable<Route[]>(
	base_routes.map((base_route) => ({ ...base_route, active: false }))
);
