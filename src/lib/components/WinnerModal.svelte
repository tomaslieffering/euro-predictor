<script lang="ts">
	import { X } from "lucide-svelte";
	import ConfettiPop from "./ConfettiPop.svelte";
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog
	class="rounded-lg shadow-lg w-1/2 z-10 overflow-visible"
	bind:this={dialog}
	on:close={() => (showModal = false)}
>
	<div>
		<div
			class="flex items-center justify-between p-4 md:p-5 border-b rounded-t-lg bg-gradient-to-r from-primary to-secondary"
		>
			<h3 class="text-xl font-semibold text-white">
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
			class="flex overflow-hidden py-4 bg-gradient-to-r from-white to-gray-200"
		>
			<div class="flex items-center justify-between px-4">
				<slot />
			</div>
			<slot name="flag" />
		</div>

		<hr />

		<slot name="footer" />
	</div>
</dialog>
<ConfettiPop active={showModal} />
