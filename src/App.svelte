<script lang="ts">
  import "/node_modules/flag-icons/css/flag-icons.min.css";
  import GroupStage from "./lib/GroupStage.svelte";
  import Knockout from "./lib/Knockout.svelte";
  import ThirdPlace from "./lib/ThirdPlace.svelte";
  import Toasts from "./lib/components/Toasts.svelte";
</script>

<main class="container mx-auto px-8 font-space">
  <h1>Euros Predictor</h1>
  <span class="fi fi-gr"></span>

  <GroupStage />
  <ThirdPlace />
  <Knockout />
  <Toasts />
</main>
