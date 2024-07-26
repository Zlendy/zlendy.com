export interface Route {
	title: string;
	href: string;
}

export const routes: Route[] = [
	{
		title: 'Home',
		href: '/'
	},
	{
		title: 'Blog',
		href: '/blog'
	},
	{
		title: 'About',
		href: '/about'
	}
];
