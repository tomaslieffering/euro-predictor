<script lang="ts">
	import { CircleAlert, CircleCheck } from "lucide-svelte";
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
	class="relative grid grid-cols-2 h-40 gap-2 rounded bg-white shadow-lg p-4 transition-all"
>
	{#each teamsInfo as team, index}
		{#if team}
			<div
				class="{index === gameInfo.winner
					? 'bg-green-100 font-bold hover:bg-green-300'
					: 'bg-white'} border border-gray-300 hover:border-gray-400 flex items-center rounded transform-all hover:-translate-y-0.5 hover:shadow"
			>
				<button
					on:click={toggleTeam(index)}
					class="relative w-full h-full py-2 px-2"
				>
					<div class="z-10 relative">
						<span class="pr-2 fi fi-{team.team.icon}"></span>
						{team.team.country}
					</div>
					{#if index === gameInfo.winner}
						<div
							class=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
						>
							<CircleCheck class="-z-0 text-green-400 w-20 h-20" />
						</div>
					{/if}
				</button>
			</div>
		{:else}
			<div
				class="flex flex-col justify-center items-center text-center bg-slate-100 py-2 px-2 text-gray-500 rounded border border-slate-300 border-dashed"
			>
				<span class="pr-2">Team not selected yet!</span>
				<span>
					<CircleAlert class="pt-2" />
				</span>
			</div>
		{/if}
	{/each}
	<div
		class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center bg-white border-2 border-gray-400 rounded-full font-sm h-10 w-10"
	>
		<span class="uppercase"> vs </span>
	</div>
</div>
