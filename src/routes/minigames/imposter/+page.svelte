<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { fade } from 'svelte/transition';
	import { PAGE_TRANSITION_MS } from '../../+layout.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { wordlist_spanish } from './wordlist';
	import { untrack } from 'svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { cn } from '$lib/utils';

	/* GENERAL */

	const debug = false;

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	function sleep(ms: number) {
		return new Promise<void>((resolve) => window.setTimeout(() => resolve(), ms));
	}

	enum GameState {
		LOBBY,
		ROLES,
		VOTING,
		ENDED
	}

	let gameState = $state(GameState.LOBBY);

	/* LOBBY */

	let playerCount = $state(3);

	interface PlayerData {
		name: string;
		imposter: boolean;
		alive: boolean;
	}

	/** This will be reset whenever {@link playerCount} changes */
	let playerData: PlayerData[] = $state([]);

	$effect(() => {
		const list: PlayerData[] = [];

		for (let index = 0; index < playerCount; index++) {
			list.push({
				name: `Jugador ${index + 1}`,
				imposter: false,
				alive: true
			});
		}

		untrack(() => {
			playerData = list;
		});
	});

	/* ROLES */

	let word = $state('');
	let imposterIndex = $state<number>();

	function stateRoles() {
		imposterIndex = getRandomInt(playerCount);

		const randomWordIndex = getRandomInt(wordlist_spanish.length);
		word = wordlist_spanish[randomWordIndex];

		for (let index = 0; index < playerCount; index++) {
			playerData[index] = {
				...playerData[index],
				imposter: index === imposterIndex,
				alive: true
			};
		}

		rolePlayerIndex = 0;
		winner = undefined;

		gameState = GameState.ROLES;
	}

	let openRoleUnseenDialog = $state(false);

	let rolePlayerIndex = $state(0);
	const rolePlayerCurrent = $derived(playerData.at(rolePlayerIndex));
	const rolePlayerProgress = $derived(Math.round(((rolePlayerIndex + 1) / playerCount) * 100));
	const rolePlayerLast = $derived(rolePlayerIndex >= playerCount - 1);

	/** This will be reset whenever {@link rolePlayerIndex} changes */
	let rolePlayerSeen = $state(false);

	const rolePlayerCard = $state({
		showBack: false,
		flip() {
			rolePlayerSeen = true;
			this.showBack = !this.showBack;
		}
	});

	async function nextPlayer() {
		if (!rolePlayerSeen) {
			openRoleUnseenDialog = true;
			return;
		}

		if (rolePlayerCard.showBack) {
			rolePlayerCard.showBack = false;
			await sleep(500);
		}

		if (rolePlayerLast) {
			gameState = GameState.VOTING;
			return;
		}

		rolePlayerSeen = false;
		rolePlayerIndex += 1;
	}

	/* VOTING */

	function votePlayer(index: number) {
		const player = playerData.at(index);

		if (!player) return;
		if (!player.alive) return;

		if (player.imposter) {
			winner = Winner.INNOCENT;
			gameState = GameState.ENDED;
			return;
		}

		if (playerData.filter((p) => !p.imposter && p.alive).length <= 2) {
			winner = Winner.IMPOSTER;
			gameState = GameState.ENDED;
			return;
		}

		player.alive = false;
	}

	/* ENDED */

	enum Winner {
		INNOCENT,
		IMPOSTER
	}

	let winner = $state<Winner>();
	const winnerString: string = $derived.by(() => {
		switch (winner) {
			case Winner.INNOCENT:
				return '¡Han ganado los inocentes!';
			case Winner.IMPOSTER:
				return '¡Ha ganado impostor!';
			default:
				return 'Ha ganado... ¿nadie? (algo se ha roto)';
		}
	});
</script>

<svelte:head>
	<title>Imposter - Minigames - Zlendy</title>
</svelte:head>

<header class="flex min-h-48 flex-col items-center justify-center text-center">
	<h1 class="mb-4 text-5xl leading-tight font-bold">El Impostor</h1>
</header>

<div
	class="bg-background/25 dark:bg-background/50 mx-2 mb-4 w-[calc(100%-1rem)] max-w-3xl rounded-xl border-2 px-4 pt-4 backdrop-blur-xs"
	transition:fade={{ duration: 500 }}
>
	{#if debug}
		<div class="mb-4">
			<Button onclick={() => (gameState = GameState.LOBBY)}>Lobby</Button>
			<Button onclick={stateRoles}>View roles</Button>
			<Button onclick={() => (gameState = GameState.VOTING)}>Playing</Button>
			<Button onclick={() => (gameState = GameState.ENDED)}>Ended</Button>
		</div>
	{/if}

	{#key gameState}
		<div
			in:fade={{ duration: PAGE_TRANSITION_MS, delay: PAGE_TRANSITION_MS }}
			out:fade={{ duration: PAGE_TRANSITION_MS }}
		>
			{#if gameState === GameState.LOBBY}
				<p class="mb-4">¿Cómo jugar?</p>
				<ol class="ml-4 list-decimal">
					<li>Reúne a todos los jugadores en un mismo lugar</li>
					<li>Ingresa los nombres en un solo dispositivo compartido</li>
					<li>Cada jugador ve su rol de forma privada (¡nada de mirar el rol del otro!)</li>
					<li>Debatid cara a cara quién creéis es el impostor</li>
					<li>Votad levantando la mano o usando el dispositivo</li>
					<li>¡Descubre al impostor!</li>
				</ol>

				<Card.Root class="my-4 text-center">
					<Card.Header>
						<Card.Title>Configura la partida</Card.Title>
					</Card.Header>
					<Card.Content>
						<Label for="player-count" class="mb-2">Número de jugadores</Label>
						<Input id="player-count" type="number" min="3" max="10" bind:value={playerCount}
						></Input>
						{#each playerData as player, index (index)}
							{@const playerNumber = index + 1}

							<Label for="player-{playerNumber}" class="mt-4 mb-2">
								Nombre del jugador {playerNumber}
							</Label>
							<Input id="player-{playerNumber}" type="text" maxlength={20} bind:value={player.name}
							></Input>
						{/each}
					</Card.Content>
					<Card.Footer class="flex flex-wrap justify-center">
						<Button onclick={stateRoles}>Iniciar partida</Button>
					</Card.Footer>
				</Card.Root>
			{:else if gameState === GameState.ROLES}
				Jugador {rolePlayerIndex + 1} de {playerCount} ({rolePlayerProgress}%)
				<Progress value={rolePlayerProgress} class="my-4"></Progress>

				<AlertDialog.Root bind:open={openRoleUnseenDialog}>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>No has visto tu rol</AlertDialog.Title>
							<AlertDialog.Description>
								Haz clic en la carta para ver tu rol antes de pasarle el dispositivo al siguiente
								jugador
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>De acuerdo</AlertDialog.Cancel>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>

				<Card.Root class="my-4 text-center">
					<Card.Header>
						<Card.Title>Turno de {rolePlayerCurrent?.name}</Card.Title>
					</Card.Header>
					<Card.Content>
						<button
							type="button"
							onclick={() => rolePlayerCard.flip()}
							class="h-96 w-64 outline-none perspective-midrange"
						>
							<div
								class={cn(
									'relative size-full transition duration-500 transform-3d',
									rolePlayerCard.showBack && 'transform-[rotateY(180deg)]'
								)}
							>
								<div
									class="bg-secondary absolute inset-0 flex size-full items-center justify-center backface-hidden"
								>
									Toca para ver tu rol
								</div>
								<div
									class="bg-primary text-secondary absolute inset-0 flex size-full transform-[rotateY(180deg)] flex-col items-center justify-center backface-hidden"
								>
									{#if rolePlayerCurrent?.imposter}
										<p>Eres el impostor</p>
										<p>¡Intenta que no te pillen!</p>
									{:else}
										<p>Eres inocente</p>
										<p>La palabra es: {word}</p>
									{/if}
								</div>
							</div>
						</button>
					</Card.Content>
					<Card.Footer class="flex flex-wrap justify-center">
						<Button onclick={nextPlayer}>
							{#if rolePlayerLast}
								Comenzar a votar
							{:else}
								Siguiente jugador
							{/if}
						</Button>
					</Card.Footer>
				</Card.Root>
			{:else if gameState === GameState.VOTING}
				¿Quién creéis que es el impostor?

				<div class="my-4 grid grid-cols-2 gap-4 md:grid-cols-3">
					{#each playerData as player, index (index)}
						<Button onclick={() => votePlayer(index)} disabled={!player.alive}>
							{player.name}
							{#if debug}
								({player.imposter})
							{/if}
						</Button>
					{/each}
				</div>
			{:else if gameState === GameState.ENDED}
				<div class="mb-4 text-center">
					<h1 class="text-3xl">{winnerString}</h1>
					<p>El impostor era: {playerData.at(imposterIndex ?? -1)?.name}</p>
				</div>

				<div class="mb-4 flex flex-col items-center gap-4">
					<Button onclick={stateRoles}>Jugar otra partida con los mismos jugadores</Button>
					<Button onclick={() => (gameState = GameState.LOBBY)}>Volver al menú</Button>
				</div>
			{:else}
				<p>Invalid gameState</p>
			{/if}
		</div>
	{/key}
</div>
