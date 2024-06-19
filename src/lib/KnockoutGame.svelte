<script lang="ts">
	import { CircleAlert } from "lucide-svelte";
	import { knockouts } from "./store";
	export let teamsInfo;
	export let gameInfo;

	$: toggleTeam = (index: number) => {
		const game = $knockouts.find((game) => game.game === gameInfo.game);
		if (game) game.winner = index;
		$knockouts = $knockouts;
	};

	$: if (
		gameInfo.winner !== -1 &&
		!teamsInfo.find((team, index) => team && gameInfo.winner === index)
	) {
		gameInfo.winner = -1;
		$knockouts = $knockouts;
	}
</script>

<div
	class="flex flex-col gap-2 rounded shadow-lg p-4 bg-slate-200 transition-all"
>
	{#each teamsInfo as team, index}
		{#if team}
			<div
				class="{index === gameInfo.winner
					? 'bg-green-300 font-bold'
					: 'bg-white'} rounded border-2 border-transparent transform-all hover:-translate-y-0.5 hover:shadow"
			>
				<button
					on:click={toggleTeam(index)}
					class="w-full py-2 px-2 text-center"
				>
					{team.team.country}
				</button>
			</div>
		{:else}
			<div
				class="flex justify-center items-center text-center bg-slate-100 py-2 px-2 text-gray-500 rounded border border-slate-300 border-dashed"
			>
				<span class="pr-2">Team not selected yet!</span>
				<span>
					<CircleAlert class="h-4" />
				</span>
			</div>
		{/if}
	{/each}
</div>
