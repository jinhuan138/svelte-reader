<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./router/index";
</script>

<main>
  <Router {routes} />
</main>
