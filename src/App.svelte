<script lang="ts">
  import "/node_modules/flag-icons/css/flag-icons.min.css";
  import GroupStage from "./lib/GroupStage.svelte";
  import Knockout from "./lib/Knockout.svelte";
  import ThirdPlace from "./lib/ThirdPlace.svelte";
  import Toasts from "./lib/components/Toasts.svelte";
  import Header from "./lib/Header.svelte";
</script>

<Header />
<main class="bg-gray-100">
  <div class="container mx-auto px-8 font-roboto">
    <GroupStage />
    <ThirdPlace />
    <Knockout />
    <Toasts />
  </div>
</main>
