<script lang="ts">
	import { slide } from "svelte/transition";
	import { eurosGroups, thirdChosen } from "./store";
	import { addToast } from "./store";
	import { ChevronDown, CircleAlert, CircleCheck } from "lucide-svelte";

	let open = true;

	$: thirdPlaces = $eurosGroups.map((group) => {
		return {
			group: group.group,
			team: group.teams.find((team) => team.position === 3),
		};
	});

	const toggleTeam = (team) => {
		let toToggle = $eurosGroups
			.find((group) => {
				return group.group === team.group;
			})
			?.teams.find((teamInGroup) => {
				return teamInGroup.country === team.team.country;
			});
		if (toToggle) {
			if ($thirdChosen < 4 && !toToggle.qualified) {
				toToggle.qualified = true;
				$thirdChosen += 1;
			} else if (toToggle.qualified) {
				toToggle.qualified = false;
				$thirdChosen -= 1;
			} else {
				addToast("Only 4 of the third place teams can be selected!");
			}
			$eurosGroups = $eurosGroups;
		}
	};

	const toggle = () => {
		open = !open;
	};
</script>

<div class="border-b-2 border-slate-500">
	<button
		class="w-full text-left flex justify-between items-center"
		on:click={toggle}
	>
		<div class="flex items-end">
			<h2 class="text-2xl font-bold capitalize py-8">Best third place:</h2>
			<span class="text-lg text-gray-400 py-8 pl-4 italic"
				>Select the four third place teams who you think will perform the best:</span
			>
		</div>
		<ChevronDown class="transition-all {open ? 'rotate-180' : ''}" />
	</button>
	{#if open}
		<ol
			class="grid grid-cols-2 grid-rows-3 lg:grid-rows-2 lg:grid-cols-3 gap-4 pb-8"
			transition:slide
		>
			{#each thirdPlaces as thirdPlace}
				{#if thirdPlace.team}
					<li>
						<button
							on:click={toggleTeam(thirdPlace)}
							class="{thirdPlace.team.qualified
								? 'bg-green-200 hover:bg-green-300'
								: 'hover:bg-gray-100'} 
								py-4 px-4 transition-all border border-gray-300 hover:border-gray-400 hover:-translate-y-0.5 flex justify-center shadow-md rounded h-full w-full"
						>
							<div class="flex items-center justify-centerpx-2">
								<span class="pr-2">
									Group {thirdPlace.group}:
								</span>
								<span class="fi fi-{thirdPlace.team.icon}"></span>
								<span class="px-2 font-bold">
									{thirdPlace.team.country}
								</span>
								{#if thirdPlace.team.qualified}
									<CircleCheck class="text-green-500" />
								{/if}
							</div>
						</button>
					</li>
				{:else}
					<li
						class="bg-white opacity-50 flex justify-center items-center text-center bg-slate-100 py-4 px-2 text-gray-500 rounded border border-slate-300 border-dashed"
					>
						<span class="pr-2"
							>Finish your Group {thirdPlace.group} selections</span
						>
						<span>
							<CircleAlert />
						</span>
					</li>
				{/if}
			{/each}
		</ol>
	{/if}
</div>
