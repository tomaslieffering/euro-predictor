<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
>
	<div>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<button on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>
