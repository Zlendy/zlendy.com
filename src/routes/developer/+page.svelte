<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Logo from '$lib/components/logo.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';

	interface LanguageOrTool {
		icon: string;
		name: string;
		href?: string;
	}

	const langtools: LanguageOrTool[] = [
		{
			icon: 'bash',
			name: 'GNU Bash',
			href: 'https://www.gnu.org/software/bash/'
		},
		{
			icon: 'csharp',
			name: 'C#',
			href: 'https://dotnet.microsoft.com/en-us/languages/csharp'
		},
		{
			icon: 'css',
			name: 'CSS',
			href: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
		},
		{
			icon: 'django',
			name: 'Django',
			href: 'https://www.djangoproject.com/'
		},
		{
			icon: 'docker',
			name: 'Docker',
			href: 'https://www.docker.com/'
		},
		{
			icon: 'dotnet',
			name: '.NET',
			href: 'https://dotnet.microsoft.com/en-us/'
		},
		{
			icon: 'git',
			name: 'Git',
			href: 'https://git-scm.com/'
		},
		{
			icon: 'html',
			name: 'HTML',
			href: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
		},
		{
			icon: 'javascript',
			name: 'JavaScript',
			href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
		},
		{
			icon: 'linux',
			name: 'GNU/Linux',
			href: 'https://www.kernel.org/category/about.html'
		},
		{
			icon: 'mariadb',
			name: 'MariaDB',
			href: 'https://mariadb.org/'
		},
		{
			icon: 'sqlserver',
			name: 'SQL Server',
			href: 'https://www.microsoft.com/en-us/sql-server'
		},
		{
			icon: 'nestjs',
			name: 'NestJS',
			href: 'https://nestjs.com/'
		},
		{
			icon: 'nodejs',
			name: 'Node.js',
			href: 'https://nodejs.org/'
		},
		{
			icon: 'postgresql',
			name: 'PostgreSQL',
			href: 'https://www.postgresql.org/'
		},
		{
			icon: 'python',
			name: 'Python',
			href: 'https://www.python.org/'
		},
		{
			icon: 'rust',
			name: 'Rust',
			href: 'https://www.rust-lang.org/'
		},
		{
			icon: 'selenium',
			name: 'Selenium',
			href: 'https://www.selenium.dev/'
		},
		{
			icon: 'svelte',
			name: 'Svelte',
			href: 'https://svelte.dev/'
		},
		{
			icon: 'tailwindcss',
			name: 'Tailwind CSS',
			href: 'https://tailwindcss.com/'
		},
		{
			icon: 'typescript',
			name: 'TypeScript',
			href: 'https://www.typescriptlang.org/'
		},
		{
			icon: 'vue',
			name: 'Vue',
			href: 'https://vuejs.org/'
		},
		{
			icon: 'tauri',
			name: 'Tauri',
			href: 'https://v2.tauri.app/'
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
			name: 'gethomepage / homepage',
			license: 'GPLv3',
			status: 'Active',
			description:
				'A user-configurable Homepage widget that displays the amount of songs, movies, episodes or other media played using Jellyfin in the last N days',
			repository: 'https://github.com/gethomepage/homepage/pull/5185',
			techstack: ['javascript', 'nextjs', 'react', 'tailwindcss']
		},
		{
			name: 'CyferShepard / Jellystat',
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
	<h1 class="mb-4 text-5xl leading-tight font-bold">Developer</h1>
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

<div
	class="bg-background/40 dark:bg-background/80 mx-auto mb-4 max-w-3xl rounded-xl border-2 px-4 pt-4 backdrop-blur-md"
>
	<p class="mb-4">
		I'm primarily a Web Developer, although I sometimes code stuff outside of that realm.
	</p>

	<Heading tag="h1">Languages and Tools</Heading>
	<p class="my-4">I have used all of these either at work or home</p>
	<div class="my-4 flex flex-wrap justify-center gap-4">
		{#each langtools as { icon, name, href }}
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<a
							class="bg-popover hover:border-primary flex aspect-square size-14 items-center justify-center rounded-xl transition-all hover:border-2 hover:drop-shadow-[0_0_1em_var(--primary)]"
							{href}
							target="_blank"
						>
							<Logo class="size-10!" name={icon} />
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content>
						{name}
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
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
