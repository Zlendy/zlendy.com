import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const component = await import(`./content.md`);

	return {
		component: component.default
	};
};
