<script lang="ts">
	import { X } from "lucide-svelte";
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog
	class="rounded-lg w-1/2"
	bind:this={dialog}
	on:close={() => (showModal = false)}
>
	<div>
		<div
			class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
		>
			<h3 class="text-xl font-semibold text-gray-900">
				<slot name="header" />
			</h3>
			<button
				on:click={() => dialog.close()}
				class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
			>
				<X />
			</button>
		</div>

		<hr />

		<div
			class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
		>
			<slot />
		</div>
		<hr />
		<div
			class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
		>
			<!-- <slot name="footer" /> -->
		</div>
	</div>
</dialog>
