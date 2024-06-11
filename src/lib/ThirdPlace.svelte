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
		<h2 class="text-2xl py-8">Best third place</h2>
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
							class="flex justify-center w-full rounded border-2 {thirdPlace
								.team.qualified
								? 'bg-green-300'
								: 'bg-slate-300'} border-slate-400 py-4 px-4 transition-all hover:bg-green-200 hover:border-green-500"
						>
							<span class="pr-2"
								>Group {thirdPlace.group}: {thirdPlace.team.country}
							</span>
							{#if thirdPlace.team.qualified}
								<CircleCheck class="text-green-700" />
							{/if}
						</button>
					</li>
				{:else}
					<li
						class="flex justify-center items-center text-center bg-slate-100 py-4 px-2 text-gray-500 rounded border border-slate-300 border-dashed"
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
