/*
I am not the original author of this code, this is an adaptation of "mdsvex-enhanced-images"
https://github.com/benallfree/mdsvex-enhanced-images/blob/c773e8fdf97df212a28cc5ed72f5a988dd52d45f/src/index.ts

MIT License
Copyright (c) 2024 Ben Allfree
*/

import { visit } from 'unist-util-visit';

function escapeHtmlAttribute(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

export const customImages = () => {
	return (tree) => {
		visit(tree, 'image', (node, index, parent) => {
			// Ignore images outside of project
			if (node.url.startsWith('http://') || node.url.startsWith('https://')) return;

			node.type = 'html';

			let enhancedImgHtml = `<img src="${node.url}" `;
			let imgAlt = node.alt !== null ? escapeHtmlAttribute(node.alt) : null;

			if (imgAlt !== null) enhancedImgHtml += ` alt="${imgAlt}" title="${imgAlt}"`;

			enhancedImgHtml += ` data-zoomable="" />`;

			node.value = enhancedImgHtml;
		});
	};
};
