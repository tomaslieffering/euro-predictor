<script lang="ts">
  import { onMount } from "svelte";
  import "/node_modules/flag-icons/css/flag-icons.min.css";
  import GroupStage from "./lib/GroupStage.svelte";
  import Knockout from "./lib/Knockout.svelte";
  import ThirdPlace from "./lib/ThirdPlace.svelte";
  import Toasts from "./lib/components/Toasts.svelte";
  import Header from "./lib/Header.svelte";
  import { decompressFromBase64 } from "lz-string";

  onMount(() => {
    const params = new URLSearchParams(location.search);
    const prediction = params.get("prediction");

    if (prediction) {
      const objects = decompressFromBase64(prediction);
      console.log(objects);
    }
  });
</script>

<Header />
<main class="bg-gray-100 h-dvh">
  <div class="container mx-auto px-8 font-roboto">
    <GroupStage />
    <ThirdPlace />
    <Knockout />
  </div>
</main>
<Toasts />
