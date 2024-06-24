<script>
  import Confetti from "svelte-confetti";

  export let active = false;
</script>

{#if active}
  <div class="z-50 absolute left-1/2">
    <Confetti x={[-3, 3]} y={[0.5, 5]} amount={250} />
  </div>
{/if}
