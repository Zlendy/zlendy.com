<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Logo from '$lib/components/logo.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import LinkHoverTitle from '$lib/components/link-hover-title.svelte';

	interface LanguageOrTool {
		icon: string;
		name: string;
		href?: string;
	}

	const langtools: LanguageOrTool[] = [
		{
			icon: 'bash',
			name: 'GNU Bash'
		},
		{
			icon: 'csharp',
			name: 'C#'
		},
		{
			icon: 'css',
			name: 'CSS'
		},
		{
			icon: 'django',
			name: 'Django'
		},
		{
			icon: 'docker',
			name: 'Docker'
		},
		{
			icon: 'dotnet',
			name: '.NET'
		},
		{
			icon: 'git',
			name: 'Git'
		},
		{
			icon: 'html',
			name: 'HTML'
		},
		{
			icon: 'javascript',
			name: 'JavaScript'
		},
		{
			icon: 'linux',
			name: 'GNU/Linux'
		},
		{
			icon: 'mysql',
			name: 'MySQL'
		},
		{
			icon: 'sqlserver',
			name: 'SQL Server'
		},
		{
			icon: 'nestjs',
			name: 'NestJS'
		},
		{
			icon: 'nodejs',
			name: 'Node.js'
		},
		{
			icon: 'postgresql',
			name: 'PostgreSQL'
		},
		{
			icon: 'python',
			name: 'Python'
		},
		{
			icon: 'rust',
			name: 'Rust'
		},
		{
			icon: 'selenium',
			name: 'Selenium'
		},
		{
			icon: 'svelte',
			name: 'Svelte'
		},
		{
			icon: 'tailwindcss',
			name: 'Tailwind CSS'
		},
		{
			icon: 'typescript',
			name: 'TypeScript'
		},
		{
			icon: 'vue',
			name: 'Vue'
		}
	];

	interface Project {
		icon?: string;
		name: string;
		license: string;
		status: 'Active' | 'Archived' | 'In progress';
		description: string;
		repository: string;
		techstack: string[];
	}

	const projects: Project[] = [
		{
			name: 'zlendy.com',
			license: 'MIT',
			status: 'Active',
			description: "My personal website and blog, you're viewing it right now.",
			repository: 'https://github.com/Zlendy/zlendy.com',
			techstack: ['typescript', 'svelte', 'sveltekit', 'tailwindcss', 'mdsvex']
		},
		{
			name: 'api.zlendy.com',
			license: 'MIT',
			status: 'Active',
			description: 'RESTful API server used in zlendy.com to retrieve blog posts metadata.',
			repository: 'https://github.com/Zlendy/api.zlendy.com',
			techstack: ['rust', 'axum', 'tokio', 'serde']
		}
	];

	const contributions: Project[] = [
		{
			name: 'gethomepage/homepage',
			license: 'GPLv3',
			status: 'Active',
			description:
				'A user-configurable Homepage widget that displays the amount of songs, movies, episodes or other media played using Jellyfin in the last N days',
			repository: 'https://github.com/gethomepage/homepage/pull/5185',
			techstack: ['javascript', 'nextjs', 'react', 'tailwindcss']
		},
		{
			name: 'CyferShepard/Jellystat',
			license: 'MIT',
			status: 'Active',
			description:
				'A new API endpoint which retrieves the data (songs, movies, episodes or other) consumed by the Homepage widget',
			repository: 'https://github.com/CyferShepard/Jellystat/pull/378',
			techstack: ['javascript', 'express', 'postgresql', 'react']
		}
	];
</script>

<svelte:head>
	<title>Developer - Zlendy</title>
</svelte:head>

<header class="flex min-h-48 flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-5xl font-bold leading-tight">Developer</h1>
</header>

{#snippet projectCard({ icon, name, license, status, description, repository, techstack }: Project)}
	<a href={repository}>
		<Card.Root>
			<Card.Header>
				<Card.Title>
					{#if icon}
						<Logo name={icon} />
					{/if}
					{name}
				</Card.Title>
				<Card.Description>
					License: {license}. Status: {status}
				</Card.Description>
			</Card.Header>
			<Card.Content class="whitespace-pre-wrap">
				{description}
			</Card.Content>
			<Card.Footer class="flex flex-wrap gap-2">
				{#each techstack as item}
					<Badge>
						{item}
					</Badge>
				{/each}
			</Card.Footer>
		</Card.Root>
	</a>
{/snippet}

<div class="mx-auto mb-4 max-w-2xl px-4">
	<p class="mb-4">
		I'm primarily a Web Developer, although I sometimes code stuff outside of that realm.
	</p>

	<Heading tag="h1">Languages and Tools</Heading>
	<p class="my-4">I have used all of these either at work or home</p>
	<div class="my-4 flex flex-wrap justify-center gap-4">
		{#each langtools as { icon, name, href }}
			<LinkHoverTitle
				class="flex aspect-square size-14 items-center justify-center rounded-xl bg-muted transition-all hover:border-4 hover:border-primary"
				title={name}
				{href}
			>
				<Logo class="!size-10" name={icon} />
			</LinkHoverTitle>
		{/each}
	</div>

	<Heading tag="h1">Projects</Heading>
	<div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each projects as project}
			{@render projectCard(project)}
		{/each}
	</div>

	<Heading tag="h1">FOSS Contributions</Heading>
	<p class="my-4">Some contributions I have made to Open Source projects</p>
	<div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each contributions as contribution}
			{@render projectCard(contribution)}
		{/each}
	</div>
</div>
