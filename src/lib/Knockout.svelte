<script lang="ts">
	import { slide } from "svelte/transition";
	import { eurosGroups, knockouts, finished } from "./store";
	import euros from "./data/groups.json";
	import knockout from "./data/knockout.json";
	import KnockoutGame from "./KnockoutGame.svelte";
	import WinnerModal from "./components/WinnerModal.svelte";
	import ConfettiPop from "./components/ConfettiPop.svelte";
	import {
		ChevronDown,
		RefreshCcw,
		SquareArrowOutUpRight,
	} from "lucide-svelte";

	let open = true;
	let showModal = false;

	const places = [1, 2, 3];

	const toggle = () => {
		open = !open;
	};

	$: resetPredictor = () => {
		knockouts.set(knockout);
		eurosGroups.set(euros);
	};

	$: placings = places.map((place) => {
		return $eurosGroups
			.filter((group) =>
				group.teams.find((team) => team.position === place && team.qualified),
			)
			.map((group) => ({
				group: group.group,
				team: group.teams.find((team) => team.position === place),
			}));
	});

	$: getBaseTeams = (game) => {
		return game.teams.map((team) => {
			if (team.place === 3) {
				return placings[team.place - 1][team.group];
			} else {
				return placings[team.place - 1].find(
					(toFind) => toFind.group === team.group,
				);
			}
		});
	};

	$: getTeams = (game) => {
		if (game) {
			if (game.depth === 4) {
				//base case, find team and return
				return getBaseTeams(game);
			}
			const teams = game.teams.map((team) => {
				const previous = $knockouts.find((toFind) => toFind.game === team);

				if (previous && previous.winner !== -1) {
					return getTeams(previous)[previous.winner];
				}
			});
			return teams;
		}
	};

	$: showModal = $finished !== -1;
	$: winner =
		$finished !== undefined && $finished !== -1
			? getTeams($knockouts.find((game) => game.game === 1))[$finished]
			: undefined;
</script>

<div class="border-b-2 border-slate-500">
	<button
		class="w-full text-left flex justify-between items-center"
		on:click={toggle}
	>
		<div class="flex items-end">
			<h2 class="text-2xl font-bold capitalize py-8">Knockouts:</h2>
			<span class="text-lg text-gray-400 py-8 pl-4 italic"
				>Select which team will win in each pairing. Winner moves to the next
				round!</span
			>
		</div>
		<ChevronDown class="transition-all {open ? 'rotate-180' : ''}" />
	</button>
	{#if open}
		<div transition:slide class="flex flex-col gap-16">
			<div class="flex flex-col">
				<span class="text-xl font-bold pb-8">Rounds of 16:</span>
				<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
					{#each $knockouts.filter((game) => game.depth === 4) as game}
						<KnockoutGame teamsInfo={getTeams(game)} gameInfo={game} />
					{/each}
				</div>
			</div>

			<div class="flex flex-col">
				<span class="text-xl font-bold pb-8">Quarter finals:</span>
				<div class="grid grid-cols-4 justify-around gap-4 h-full">
					{#each $knockouts.filter((game) => game.depth === 3) as game}
						<KnockoutGame teamsInfo={getTeams(game)} gameInfo={game} />
					{/each}
				</div>
			</div>

			<div class="flex flex-col pb-8">
				<span class="text-xl font-bold pb-8">Semi finals:</span>
				<div class="grid grid-cols-2 gap-4 h-full">
					{#each $knockouts.filter((game) => game.depth === 2) as game}
						<KnockoutGame teamsInfo={getTeams(game)} gameInfo={game} />
					{/each}
				</div>
			</div>

			<div class="flex flex-col pb-8">
				<span class="text-xl font-bold pb-8">Final:</span>
				<div class="flex flex-col justify-center h-full">
					{#each $knockouts.filter((game) => game.depth === 1) as game}
						<KnockoutGame teamsInfo={getTeams(game)} gameInfo={game} />
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<WinnerModal bind:showModal>
	<span slot="header">
		{#if winner}
			<span class="font-normal">Your winner is</span>
			<span class="font-bold">
				{winner.team.country}!
			</span>
		{/if}
	</span>

	{#if winner}
		<span>
			You have choosen {winner.team.country} to win the UEFA Euros. Congratulations
			to {winner.team.country}!
		</span>
	{/if}

	<div
		slot="flag"
		class="flex rounded-full shadow-xl w-1/3 aspect-square overflow-hidden translate-x-1/2 fib fi-{winner
			? winner.team.icon
			: ''} fis"
	></div>

	<span slot="footer">
		<div class="flex gap-4 justify-end w-full p-4">
			<button
				on:click={resetPredictor}
				class="flex items-center bg-primary hover:bg-primaryhover text-white font-bold py-2 px-4 rounded-full"
			>
				<span class="pr-2"> Redo predictions </span>
				<RefreshCcw />
			</button>
			<button
				class="flex items-center bg-primary hover:bg-primaryhover text-white font-bold py-2 px-4 rounded-full"
			>
				<span class="pr-2"> Share predictions</span>
				<SquareArrowOutUpRight />
			</button>
		</div>
	</span>
</WinnerModal>
