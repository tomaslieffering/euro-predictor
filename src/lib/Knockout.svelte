<script lang="ts">
	import { slide } from "svelte/transition";
	import { eurosGroups, knockouts, finished } from "./store";
	import KnockoutGame from "./KnockoutGame.svelte";
	import WinnerModal from "./components/WinnerModal.svelte";
	import { ChevronDown } from "lucide-svelte";

	let open = true;
	let showModal = false;

	const places = [1, 2, 3];

	const toggle = () => {
		open = !open;
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
</script>

<div class="border-b-2 border-slate-500">
	<button
		class="w-full text-left flex justify-between items-center"
		on:click={toggle}
	>
		<h2 class="text-2xl py-8 font-bold">Knockouts</h2>
		<ChevronDown class="transition-all {open ? 'rotate-180' : ''}" />
	</button>
	{#if open}
		<div transition:slide class="grid grid-cols-4 gap-16">
			<div class="flex flex-col">
				<span class="text-xl font-bold pb-8">Rounds of 16:</span>
				<div class="flex flex-col justify-around gap-4 h-full">
					{#each $knockouts.filter((game) => game.depth === 4) as game}
						<KnockoutGame teamsInfo={getTeams(game)} gameInfo={game} />
					{/each}
				</div>
			</div>
			<div class="flex flex-col">
				<span class="text-xl font-bold pb-8">Quarter finals:</span>
				<div class="flex flex-col justify-around gap-4 h-full">
					{#each $knockouts.filter((game) => game.depth === 3) as game}
						<KnockoutGame teamsInfo={getTeams(game)} gameInfo={game} />
					{/each}
				</div>
			</div>
			<div class="flex flex-col pb-8">
				<span class="text-xl font-bold">Semi finals:</span>
				<div class="flex flex-col justify-around gap-4 h-full">
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
	<h2 slot="header">
		modal
	</h2>

	<ol>
	</ol>
</WinnerModal>
