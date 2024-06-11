<script lang="ts">
	import { CircleX, CirclePlus, RefreshCcw, CircleCheck } from "lucide-svelte";
	import { createEventDispatcher } from "svelte";
	import { fly } from "svelte/transition";
	import { thirdChosen } from "./store";

	type Team = {
		country: string;
		short: string;
		position: number;
		qualified: boolean;
		icon: string;
	};

	export let group;
	export let teams: Array<Team>;

	let selected = 0;

	const placeSuffix = ["st", "nd", "rd", "th"];

	const dispatch = createEventDispatcher();

	const selectTeam = (team: Team) => {
		selected += 1;
		team.position = selected;
		if (selected <= 2) {
			team.qualified = true;
		}
		if (selected === 3) {
			let last = teams.find((team) => {
				return team.position === 0;
			});
			if (last) {
				last.position = 4;
			}
			selected += 1;
		}
		teams = teams;
		dispatch("updated");
	};

	const removeTeam = (team: Team) => {
		selected -= 1;
		teams
			.filter((toAdjust) => toAdjust.position > team.position)
			.forEach((toAdjust) => {
				toAdjust.position -= 1;
				if (toAdjust.position <= 2) {
					toAdjust.qualified = true;
				}
			});
		if (team.position === 3 && team.qualified) {
			$thirdChosen -= 1; 
		}
		team.qualified = false;
		team.position = 0;
		teams = teams;

		dispatch("updated");
	};

	const resetTeams = () => {
		teams.forEach((team) => {
			if (team.position === 3 && team.qualified) {
				$thirdChosen -= 1; 
			}
			team.position = 0;
			team.qualified = false;
		});
		selected = 0;
		teams = teams;
		dispatch("updated");
	};

	const sortByPostion = (a: Team, b: Team) => {
		if (a.position < b.position) {
			return -1;
		} else if (a.position > b.position) {
			return 1;
		}
		return 0;
	};

	$: completed = selected >= teams.length;
	$: completedColor = completed ? "bg-slate-300" : "bg-slate-200";
	$: if (completed) {
		dispatch("finished");
	} else {
		dispatch("reset");
	}
</script>

<div class="rounded shadow-lg p-4 transition-all {completedColor}">
	<div class="flex items-center justify-between">
		<h2 class="text-lg font-bold">Group {group}</h2>
		<button
			class="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
			on:click={resetTeams}
		>
			<RefreshCcw />
		</button>
	</div>
	<ul
		class="grid grid-cols-4 gap-2 py-4 border-b border-b-slate-500 border-dashed"
	>
		{#each teams as team}
				{#if team.position === 0}
					<li
						class="bg-white rounded border-2 border-transparent transform-all hover:-translate-y-0.5 hover:shadow"
					>
						<button
							class="w-full py-4 px-4 text-left text-sm"
							on:click={selectTeam(team)}
						>
							<span class="fi fi-{team.icon}"></span>
							<span class="uppercase">
								{team.short}
							</span>
						</button>
					</li>
				{:else}
					<li
						class="bg-white rounded border-2 border-transparent"
					>
						<div class="w-full py-4 px-4 text-left text-sm opacity-50">
							<span class="fi fi-{team.icon}"></span>
							<span class="uppercase">
								{team.short}
							</span>
						</div>
					</li>
				{/if}
		{/each}
	</ul>

	<ol class="flex flex-col gap-2 pt-4 list-decimal">
		{#each teams
			.sort(sortByPostion) as team, index}
			<li
				class="flex justify-between py-4 px-4 border-2 border-slate-400 rounded"
				in:fly={{ y: -50, duration: 200 }}
			>
				{#if team.position === 0}
					{#if index === selected}
						<span class="pr-2 text-center">Which team will come in {selected + 1}{placeSuffix[selected]} place?</span>
						<span>
							<CirclePlus />
						</span>
					{/if}
				{:else}
					<div class="flex">
						<div
							class="grid place-items-center h-full aspect-square rounded-full bg-white border-black border-2"
						>
							<span class="text-sm">{team.position}</span>
						</div>
						<span class="text-md pl-2">
							{team.country}
						</span>
						<span class="fi fi-{team.icon}"></span>
					</div>
					<button
						class="text-slate-500 transition-all hover:text-slate-700"
						on:click={removeTeam(team)}
					>
						<CircleX />
					</button>
				{/if}
			</li>
		{/each}
	</ol>
	{#if completed}
		<div class="pt-8">
			<span
				class="flex justify-center bg-slate-100 py-4 px-4 text-gray-500 rounded border border-slate-300 border-dashed"
			>
				All teams selected!
				<span class="text-green-500 pl-2">
					<CircleCheck />
				</span>
			</span>
		</div>
	{/if}
</div>
