import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createHighlighter } from 'shiki';
import { importAssets } from 'svelte-preprocess-import-assets';
import { customImages } from './custom-img.js';

const mdsvexExtensions = ['.md'];

const highlighter = await createHighlighter({
	themes: ['rose-pine-dawn', 'rose-pine-moon'],
	langs: ['javascript', 'typescript', 'python', 'c#', 'vb', 'rust', 'docker', 'dockerfile', 'bash']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexExtensions],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess({ script: true }),
		mdsvex({
			extensions: mdsvexExtensions,
			smartypants: {
				dashes: 'oldschool'
			},
			highlight: {
				highlighter: async (code, lang = 'text') => {
					/** @type {string} */
					let html = escapeSvelte(
						highlighter.codeToHtml(code, {
							lang,
							themes: {
								light: 'rose-pine-dawn',
								dark: 'rose-pine-moon'
							},
							defaultColor: 'light'
						})
					);
					html = html.replaceAll('&#123;&#123;', '{').replaceAll('&#125;&#125;', '}');
					return `<Components.pre lang="${lang}">${html}</Components.pre>`;
				}
			},
			layout: {
				_: import.meta.dirname + '/src/lib/components/mdsvex/layouts/custom.svelte'
			},
			remarkPlugins: [customImages]
		}),
		importAssets({
			urlFilter: (url) => url !== '/favicon.png'
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			fallback: '404.html'
		}),
		alias: {
			'@/*': './path/to/lib/*'
		},
		prerender: {
			handleMissingId: 'ignore'
		}
	}
};

export default config;
