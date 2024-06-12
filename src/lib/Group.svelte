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

	let selected = teams.filter((team) => team.position !== 0).length;

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
	$: if (completed) {
		dispatch("finished");
	} else {
		dispatch("reset");
	}
</script>

<div class="rounded shadow-lg p-4 transition-all bg-white">
	<div class="flex items-center">
		<div class="flex flex-grow">
			<h2 class="text-lg font-bold">Group {group}</h2>
			{#if completed}
				<div class="flex items-center text-green-500 pl-2">
					<CircleCheck />
				</div>
			{/if}
		</div>
		<button
			class="flex items-center bg-primary hover:bg-primaryhover text-white font-bold py-2 px-4 rounded-full"
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
					class="bg-gray-100 h-12 rounded border-2 border-transparent transform-all hover:-translate-y-0.5 hover:shadow"
				>
					<button
						class="flex justify-center items-center h-full w-full text-sm"
						on:click={selectTeam(team)}
					>
						<span class="fi fi-{team.icon}"></span>
						<span class="uppercase pl-2">
							{team.short}
						</span>
					</button>
				</li>
			{:else}
				<li
					class="bg-gray-100 h-12 rounded border-2 border-transparent opacity-50"
				>
					<div class="flex justify-center items-center h-full w-full text-sm">
						<span class="fi fi-{team.icon}"></span>
						<span class="uppercase pl-2">
							{team.short}
						</span>
					</div>
				</li>
			{/if}
		{/each}
	</ul>

	<ol class="flex flex-col py-4">
		{#each teams
			.sort(sortByPostion).filter((team) => team.position !== 0) as team, index}
			<li
				class="flex justify-between py-4 px-4 border-b-2 border-slate-400
				{index <= 1 ? "bg-green-100": ""}"
				in:fly={{ y: -50, duration: 200 }}
			>

					<div class="flex">
						<span class="pr-2">
							{team.position}.
						</span>
						<span class="fi fi-{team.icon}"></span>
						<span class="text-md pl-2">
							{team.country}
						</span>
					</div>
					<button
						class="text-slate-500 transition-all hover:text-red-500"
						on:click={removeTeam(team)}
					>
						<CircleX />
					</button>
			</li>
		{/each}
		{#each {length: teams.length - selected} as _, index}
			<li class="py-4 px-4 border-b-2 border-slate-400 opacity-50">
				<div class="flex">
					<span>
						{index + selected + 1}.
					</span>
					{#if index === selected + (teams.length - (teams.length + selected))}
						<span class="pl-2 text-left flex-grow">Select the {selected + 1}{placeSuffix[selected]} place team</span>
						<span>
							<CirclePlus />
						</span>
					{/if}
				</div>
				
			</li>
		{/each}
		
	</ol>
</div>
