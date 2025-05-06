import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	const component = await import(`./content.md`);

	return {
		...data,
		component: component.default
	};
};
