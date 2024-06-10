<script lang="ts">
	import Toast from "./Toast.svelte";
	import { dismissToast, toasts } from "../store";
</script>

{#if $toasts}
	<section
		class="fixed bottom-0 right-0 flex flex-col items-end gap-3 pb-8 pr-8"
	>
		{#each $toasts as toast (toast.id)}
			<Toast on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast>
		{/each}
	</section>
{/if}
