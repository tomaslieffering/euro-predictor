<script>
	import { createEventDispatcher } from "svelte";
	import { fade, fly } from "svelte/transition";
	import { CircleX, CircleAlert } from "lucide-svelte";

	const dispatch = createEventDispatcher();
</script>

<article
	role="alert"
	class="z-10 flex py-4 px-8 bg-red-500 text-white rounded shadow-lg"
	out:fly={{ x: 50, duration: 200 }}
	in:fly={{ y: 50, duration: 200 }}
>
	<CircleAlert />
	<div class="pl-2 pr-4 border-r">
		<slot />
	</div>

	<button class="pl-4 hover:text-red-300" on:click={() => dispatch("dismiss")}>
		<CircleX />
	</button>
</article>
