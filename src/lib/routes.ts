import { writable } from 'svelte/store';

export interface Route {
	title: string;
	href: string;
	active: boolean;
}

type BaseRoute = Omit<Route, 'active'>;

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
