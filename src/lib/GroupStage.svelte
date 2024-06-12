<script lang="ts">
	import { slide } from "svelte/transition";
	import Group from "./Group.svelte";
	import { eurosGroups } from "./store";
	import { ChevronDown, RefreshCcw } from "lucide-svelte";

	let finished = 0;
	let open = true;

	const toggle = () => {
		open = !open;
	};

	const groupFinished = () => {
		finished += 1;
	};

	const groupReset = () => {
		finished -= 1;
	};

	const groupUpdated = () => {
		$eurosGroups = $eurosGroups;
	};
</script>

<div class="border-b-2 border-slate-500">
	<button
		class="w-full text-left flex justify-between items-center"
		on:click={toggle}
	>
		<div class="flex items-end">
			<h2 class="text-2xl font-bold capitalize py-8">Group stage:</h2>
			<span class="text-lg text-gray-400 py-8 pl-4 italic">Select the order of each group:</span>
		</div>
		<ChevronDown class="transition-all {open ? 'rotate-180' : ''}" />
	</button>
	{#if open}
		<div
			class="grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-rows-2 xl:grid-cols-3 pb-8"
			transition:slide
		>
			{#each $eurosGroups as group}
				<div>
					<Group
						group={group.group}
						teams={group.teams}
						on:finished={groupFinished}
						on:reset={groupReset}
						on:updated={groupUpdated}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>
