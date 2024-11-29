import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
	const currentRoute = url.pathname;

	return {
		currentRoute
	};
};
